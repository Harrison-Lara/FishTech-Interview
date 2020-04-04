#!/usr/bin/env node

const AWS = require('aws-sdk');
const child_process = require('child_process');
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');
const util = require('util');
const dotenv = require('dotenv')

const deploymentDir = process.argv[2];
const deploymentDirName = path.basename(deploymentDir);

const rel = relPath => path.resolve(deploymentDir, relPath);

dotenv.config({
    path: `${__dirname}/.deploy.env`
});

const cache = {};

const accessEnv = (key, defaultValue) => {
    if (!(key in process.env)) {
        if (defaultValue) return defaultValue;
        throw new Error(`${key} not found in process.env!`);
    }

    if (cache[key]) return cache[key];

    cache[key] = process.env[key];

    return process.env[key];
};

const tfFilePath = rel('../../terraform/terraform.tfstate');

if (!fs.existsSync(tfFilePath)) {
    throw new Error("terraform state file does not exist. Run `Terraform Apply`")
}

const { outputs } = JSON.parse(fs.readFileSync(tfFilePath, "utf-8"));


const exec = util.promisify(child_process.exec);

const getFullDate = () => format(new Date(), 'yyyyMMddHHmmss');

const APPLICATION_NAME = accessEnv('APPLICATION_NAME');

const MAX_BUFFER_SIZE = 1024 * 1024;

const awsRegion = outputs["aws-region"].value;

const codeDeployClient = new AWS.CodeDeploy({
    accessKeyId: accessEnv("AWS_ACCESS_KEY_ID"),
    apiVersion: '2014-10-06',
    region: awsRegion,
    secretAccessKey: accessEnv("AWS_ACCESS_KEY_SECRET")
});

const s3Client = new AWS.S3({
    accessKeyId: accessEnv("AWS_ACCESS_KEY_ID"),
    endpoint: new AWS.Endpoint(`https://s3.${awsRegion}.amazonaws.com/`),
    s3ForcePathStyle: true,
    secretAccessKey: accessEnv("AWS_ACCESS_KEY_SECRET")
});

const rootDir = rel('../');

(async () => {
    console.log('Deploying in 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    const lockFilePath = rel('../deploy.lock');
    if (fs.existsSync(lockFilePath)) {
        console.error('Lockfile deploy.lock found! Stopping...');
        process.exit();
    }

    console.log('Creating lockfile...');
    fs.writeFileSync(lockFilePath, 'This stop node-deploy from running concurrently with itself.');

    console.log('Checking environment');
    if (!fs.existsSync(rel('../.production.env'))) {
        console.log('No .production.env found! Stopping...')
        process.exit();
    }

    console.log('Generating deployment file');
    const filename = "harrison-microservice-deployment.zip";
    const zipPath = `/tmp/${filename}`;
    await exec(
        `zip a -r ${zipPath}`,
        { cwd: rootDir, maxBuffer: MAX_BUFFER_SIZE }
    );

    console.log('Uploading deployment file');
    await s3Client
        .putObject({
            Body: fs.createReadStream("/tmp/harrison-microservice-deployment.zip"),
            Bucket: "harrison-microservices-api-gateways-deployment",
            Key: filename
        }).promise();

    console.log('Upload complete! Deployment file is:', filename);

    console.log('Deploying application');

    await codeDeployClient.createDeployment({
        applicationName: "api-gateways",
        deploymentGroupName: accessEnv('CODEDEPLOY_DEPLOYMENT_GROUP_NAME'),
        revision: {
            revisionType: 'S3',
            s3Location: {
                bucket: "harrison-microservices-api-gateways-deployment",
                bundleType: 'zip',
                key: filename
            }
        }
    }).promise();

    console.log('Deployment initiated on CodeDeploy');

    console.log('Cleaning up...');
    fs.unlinkSync(rel('../deploy.lock'));
    fs.unlinkSync(rel('../appspec.yml'));
})();
