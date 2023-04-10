#!/bin/sh -e
rm -rf ./dist
mkdir dist
tsc
cp -r node_modules dist/node_modules
cp ./config.json dist/config.json
cp -r ./scripts dist/scripts
cp ./start.sh dist/start.sh
