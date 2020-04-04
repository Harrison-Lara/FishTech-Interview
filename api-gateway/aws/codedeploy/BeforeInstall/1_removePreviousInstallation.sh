#!/bin/sh

if [ -d "/opt/microservice/api-gateway" ] && [ -x "/opt/microservice/api-gateway" ]; then
  cd /opt/microservice/api-gateway

  rm -rf *
fi