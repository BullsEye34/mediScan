#!/bin/sh

npx truffle migrate --reset;

nodemon ./src/server/server.js &

RUN y | npm start -y &