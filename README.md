# Realtime game app - Backend

[![Build Status](https://travis-ci.org/emsa16/realtimegame-backend.svg?branch=master)](https://travis-ci.org/emsa16/realtimegame-backend)
[![CircleCI](https://circleci.com/gh/emsa16/realtimegame-backend.svg?style=svg)](https://circleci.com/gh/emsa16/realtimegame-backend)
[![Maintainability](https://api.codeclimate.com/v1/badges/6ae0f826a811495d302b/maintainability)](https://codeclimate.com/github/emsa16/realtimegame-backend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6ae0f826a811495d302b/test_coverage)](https://codeclimate.com/github/emsa16/realtimegame-backend/test_coverage)
[![BCH compliance](https://bettercodehub.com/edge/badge/emsa16/realtimegame-backend?branch=master)](https://bettercodehub.com/results/emsa16/realtimegame-backend)

This repo is the backend half of a realtime game prototype. The frontend can be found [here](https://github.com/emsa16/realtimegame-frontend).

This project consists of a web server built in Express, a [chat server](https://www.npmjs.com/package/@emsa16/chat-server) using WebSocket, a database module that uses MongoDB, and an authentication module that uses JSON Web Tokens as well as bcrypt for password encryption. The project uses Jest and Supertest for tests. There are Dockerfiles available to test the project in different versions of Node.

The web server is at the center of this project and offers a simple JSON API allowing for authentication and interaction with the chat server and database.


## Requirements
- Node
- npm
- mongoDB up and running
- the environment variable `JWT_SECRET` (see section **Usage** below for details)

## Installation
    $ git clone https://github.com/emsa16/realtimegame-backend.git
    $ cd realtimegame-backend
    $ npm install


## Test
    $ npm test

See below also commands for running tests in Docker.


## Usage
The following environment variables can be set by adding these before below commands:
- JWT_SECRET="STRING" - **REQUIRED** - used to create and authenticate JWT tokens, at least 64 random characters is recommended
- DBWEBB_PORT=XXXX - set server port (default: 8080)
- DBWEBB_DSN="URL" - set address to the Mongo database (default: mongodb://localhost:27017/game)
- START_CHAT=true - start chat server as well (not when running chat as a separate process) (default: false)

    $ npm start                 # Runs server in development mode with nodemon (which automatically restarts server when code changes)
    $ npm run production        # Runs server in production mode
    $ npm run start-chat        # Runs chat server as a separate process


## API
A JSON REST API that offers authentication and database services for the frontend part of this project.

- /login
    - POST
    - parameters: username, password
- /register
    - POST
    - parameters: username, password
- /player
    - GET
    - headers: x-access-token (use login token)
- /player-upsert
    - POST
    - headers: x-access-token (use login token)
    - parameters: nickname, model


## Running in Docker
    $ npm run docker-node1     # node latest-alpine (test on http://localhost:8110)
    $ npm run docker-node2     # node 10-alpine (test on http://localhost:8100)
    $ npm run docker-node3     # node 8-alpine (test on http://localhost:8088)

    $ npm run docker-start     # Runs all containers (see ports above)
    $ npm run docker-stop      # Stops all active containers
    $ npm run docker-build     # Builds above images from their respective Dockerfile

    $ npm run test-node1       # Runs npm test inside node1 container
    $ npm run test-node2       # Runs npm test inside node2 container
    $ npm run test-node3       # Runs npm test inside node3 container


BTH 2019
