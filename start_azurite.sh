#!/usr/bin/env sh

docker run -p 10000:10000 -p 10001:10001 -p 10002:10002 -v ./data mcr.microsoft.com/azure-storage/azurite