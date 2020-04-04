# IP Address Information
React, TS, Terraform, AWS

## React App

Navigate to the client directory:

### `npm start`

Runs the app in the development mode.<br />  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

The page will reload if you make edits.<br />  
You will also see any lint errors in the console.  

### `npm test`

Launches the test runner in the interactive watch mode.  

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!  

## Terraform

Navigate to the terraform directory

### `terraform init`

This command performs several different initialization steps in order to prepare a working directory for use.  

### `terraform apply`

Scans the current directory for the configuration and applies the changes appropriately.
Selecting `yes` will destroy the old instance and deploy the new one.

### `terraform destroy`

Infrastructure managed by Terraform will be destroyed. 

## API Gateway

Navigate to the api-gateway directory

###`npm deploy`

This will bundle, cleanup and deploy the application