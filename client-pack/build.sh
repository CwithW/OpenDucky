#!/bin/sh -e
(cd ..; make -B client)
mkdir -p dist
mv ../dist/client dist/
cp ./node-v18.15.0-linux-arm64.tgz dist/