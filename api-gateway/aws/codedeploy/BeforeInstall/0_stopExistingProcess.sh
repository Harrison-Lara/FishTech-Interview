#!/bin/sh

if [ -d "/opt/microservice/api-gateway" ] && [ -x "/opt/microservice/api-gateway" ]; then
  cd /opt/microservice/api-gateway

  # we have to do this because it throws an error if it can't find the process... and then the whole build breaks
  node -e 'try{require("child_process").execSync("pm2 stop api-gateway")}catch(e){}';
fi