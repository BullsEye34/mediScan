#!/bin/sh

npx truffle migrate --reset;

nodemon ./src/server/server.js &&

npm start &