# MQTT Websocket Client [![Build Status](https://travis-ci.org/khaled-hamam/mqtt-websocket-client.svg?branch=master)](https://travis-ci.org/khaled-hamam/mqtt-websocket-client)

A Websocket client using MQTT protocol and Node JS.

The project is a task for [XIOT](http://xiot.io) internship.

The application is hosted on **Heroku**, a live version can be found: [here](https://mqtt-websocket-client.herokuapp.com/).

## Pre-requisits:
* NodeJS
* NPM
* Chrome (to be able to run tests)

## Usage:
```
# installing dependencies
$ npm install

# starting the server
$ npm start
```

## Scripts:
```
# Running the server
$ npm start

# Running the server on watch mode using nodemon
$ npm run start:watch

# Running the tests using mocha-chrome package
$ npm test 
```

## Know issues:
- [ ] When unsubscribing from topics with '#' as 'test/#' the messages are not deleted (the exact topic names are deleted).
