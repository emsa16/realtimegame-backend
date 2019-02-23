# Realtime game app - Backend

[![Build Status](https://travis-ci.org/emsa16/realtimegame-backend.svg?branch=master)](https://travis-ci.org/emsa16/realtimegame-backend)
[![CircleCI](https://circleci.com/gh/emsa16/realtimegame-backend.svg?style=svg)](https://circleci.com/gh/emsa16/realtimegame-backend)
[![Maintainability](https://api.codeclimate.com/v1/badges/6ae0f826a811495d302b/maintainability)](https://codeclimate.com/github/emsa16/realtimegame-backend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6ae0f826a811495d302b/test_coverage)](https://codeclimate.com/github/emsa16/realtimegame-backend/test_coverage)
[![BCH compliance](https://bettercodehub.com/edge/badge/emsa16/realtimegame-backend?branch=master)](https://bettercodehub.com/results/emsa16/realtimegame-backend)

## Requirements
Node och npm behöver finnas installerade.

## Installation

    $ git clone https://github.com/emsa16/realtimegame-backend.git
    $ cd realtimegame-backend
    $ npm install
    $ npm test

## Running the server
DBWEBB_PORT anger vilken port servern körs på, default är 3000.

    $ [DBWEBB_PORT=XXXX] npm start          # Startar en utvecklingsserver med nodemon
    $ [DBWEBB_PORT=XXXX] npm run production # Startar produktionsserver

## API
Servern erbjuder ett enkelt JSON API med innehåll til me-sidan. JSON-svaren innehåller också anvisningar om vilka router som finns tillgängliga.

## Running in Docker

    $ npm run node1            # node latest-alpine (port 8110)
    $ npm run node2            # node 10-alpine (port 8100)
    $ npm run node3            # node 8-alpine (port 8080)
    $ npm run docker-start     # Kör alla tre containers  (se portar ovan)
    $ npm run docker-stop      # Stoppar alla aktiva containers
    $ npm run docker-build     # Bygger ovan nämnda images från respektive Dockerfile
    $ npm run test1            # Kör npm test inuti node1-containern
    $ npm run test2            # Kör npm test inuti node2-containern
    $ npm run test3            # Kör npm test inuti node3-containern

## Ladda ner projektets Docker-image
https://store.docker.com/community/images/emsa16/ramverk2-me

BTH 2019
