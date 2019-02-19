# Realtime game app - Backend

[![Build Status](https://travis-ci.org/emsa16/ramverk2-api.svg?branch=master)](https://travis-ci.org/emsa16/ramverk2-api)
[![CircleCI](https://circleci.com/gh/emsa16/ramverk2-api.svg?style=svg)](https://circleci.com/gh/emsa16/ramverk2-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/05c9f378777ee2bf5a75/maintainability)](https://codeclimate.com/github/emsa16/ramverk2-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/05c9f378777ee2bf5a75/test_coverage)](https://codeclimate.com/github/emsa16/ramverk2-api/test_coverage)
[![BCH compliance](https://bettercodehub.com/edge/badge/emsa16/ramverk2-api?branch=master)](https://bettercodehub.com/results/emsa16/ramverk2-api)

## Requirements
Node och npm behöver finnas installerade.

## Installation

    $ git clone https://github.com/emsa16/ramverk2-api
    $ cd ramverk2-api
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
