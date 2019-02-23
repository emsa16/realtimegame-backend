# Realtime game app - Backend

[![Build Status](https://travis-ci.org/emsa16/realtimegame-backend.svg?branch=master)](https://travis-ci.org/emsa16/realtimegame-backend)
[![CircleCI](https://circleci.com/gh/emsa16/realtimegame-backend.svg?style=svg)](https://circleci.com/gh/emsa16/realtimegame-backend)
[![Maintainability](https://api.codeclimate.com/v1/badges/6ae0f826a811495d302b/maintainability)](https://codeclimate.com/github/emsa16/realtimegame-backend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6ae0f826a811495d302b/test_coverage)](https://codeclimate.com/github/emsa16/realtimegame-backend/test_coverage)
[![BCH compliance](https://bettercodehub.com/edge/badge/emsa16/realtimegame-backend?branch=master)](https://bettercodehub.com/results/emsa16/realtimegame-backend)

## Requirements

- Node
- npm

## Installation

    $ git clone https://github.com/emsa16/realtimegame-backend.git
    $ cd realtimegame-backend
    $ npm install
    $ npm test

## Running the server
Adding DBWEBB_PORT=XXXX before any command sets server port, default is 3000.

    $ npm start                 # Runs server in development mode with nodemon (which automatically restarts server when code changes)
    $ npm run production        # Runs server in production mode

## API
Possible JSON REST API offering data and computations to frontend.

## Running in Docker

    $ npm run node1            # node latest-alpine (port 8110)
    $ npm run node2            # node 10-alpine (port 8100)
    $ npm run node3            # node 8-alpine (port 8080)
    $ npm run docker-start     # Runs all containers (see ports above)
    $ npm run docker-stop      # Stops all active containers
    $ npm run docker-build     # Builds above images from their respective Dockerfile
    $ npm run test1            # Runs npm test inside node1 container
    $ npm run test2            # Runs npm test inside node2 container
    $ npm run test3            # Runs npm test inside node3 container

BTH 2019
