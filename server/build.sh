#!/bin/bash -e

rm -rf dist
mkdir dist
tsc
cp -r node_modules dist/
(cd ../front;sh build.sh)
mv ../front/dist dist/public