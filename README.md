# Realtime browser game app - Backend

[![Build Status](https://travis-ci.org/emsa16/realtimegame-backend.svg?branch=master)](https://travis-ci.org/emsa16/realtimegame-backend)
[![CircleCI](https://circleci.com/gh/emsa16/realtimegame-backend.svg?style=svg)](https://circleci.com/gh/emsa16/realtimegame-backend)
[![Maintainability](https://api.codeclimate.com/v1/badges/6ae0f826a811495d302b/maintainability)](https://codeclimate.com/github/emsa16/realtimegame-backend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6ae0f826a811495d302b/test_coverage)](https://codeclimate.com/github/emsa16/realtimegame-backend/test_coverage)
[![BCH compliance](https://bettercodehub.com/edge/badge/emsa16/realtimegame-backend?branch=master)](https://bettercodehub.com/results/emsa16/realtimegame-backend)

This is the backend half of the project. The frontend half can be found [here](https://github.com/emsa16/realtimegame-frontend). This project is a part of the course [ramverk2](https://dbwebb.se/kurser/ramverk2-v1/) at Blekinge Institute of Technology.



## Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)
5. [Tests](#tests)
6. [Running in Docker](#running-in-docker)
7. [CI](#ci)
8. [Realtime / NPM module](#realtime--npm-module)
9. [Database](#database)



## Introduction
This repository is the backend half of a realtime browser game prototype. "Realtime" in this case means that the project is able to manage multiple concurrent users, sending data between each other in realtime. "Game" refers to that the prototype contains game-like aspects, like player avatar creation and users being able to control their avatar in a game world, like an old-school role-playing game.

It could be argued that this project is not much of a game per se, however the purpose is to showcase interesting techniques that could be used for these kinds of projects in a browser environment.

The backend of this project consists of a web server that manages user authentication and player creation through a simple JSON API (see [API section](#api) below). The backend also runs a WebSocket server that facilitates a chat and player movement. Finally, it manages a database storing user and player details.

#### Requirements specification
This is a list of features that were specified before development began (this includes requirements for both frontend and backend):

1. The user can register an account on the website
2. The user needs to login to access the game
3. The user can create an avatar and choose their in-game name and appearance
4. There are 5 different appearances to choose from
5. The user can modify their avatar at any point, and if the user is currently in the game world, these changes are instantly seen by other users
6. The user's avatar, including their in-game name, appearance and current position in the game world, is stored in a database and can be retrieved on any device when the user logs in
7. The user can enter the game to put their avatar in the game world
8. The game world is a graphical presentation with bitmap tiles
9. The user can move the avatar around in the game world, which is communicated to other users in realtime
10. The user can see other player avatars that have entered the game and see when they move around in the game world in realtime
11. All users that are in-game are sent regular updates with the positions of each other user's current position
12. The user can talk to other users by typing text into a text field and sending it to the game
13. Messages are displayed in speech bubbles in the game world in realtime
14. Messages are also displayed in a chat window in realtime
15. The user can leave the game at any point, which removes their avatar from the game world and other uses cannot see it any longer. The avatar's current position is stored in a database.
16. The user can logout of the site, which also removes their avatar from the game world, but stores details about it in a database
17. The project uses the author's [chat server module](https://www.npmjs.com/package/@emsa16/chat-server)
18. The project can be run in Docker
19. The project includes unit tests which cover at least 70% of the code
20. The project includes a CI chain with build, code quality and code coverage tools

All of these requirements were implemented except for 11 and 13. Requirement 11 was found to be unnecessary and requirement 13 was considered too complex to fit inside the project schedule.

#### Technologies
The backend consists of the following primary parts:
- [Express](https://expressjs.com/): A web server that functions as the core of the backend part
    - Motivation: The core Express application is pretty minimal, making it lightweight and customizable. Express is also the most popular backend JavaScript framework at the moment ([source](https://2018.stateofjs.com/back-end-frameworks/overview/))
- Chat server: The author's own, publicly available [chat server module](https://www.npmjs.com/package/@emsa16/chat-server), using WebSocket
    - Motivation: A very simple module that includes everything needed for this project
- [MongoDB](https://www.mongodb.com/download-center/community): A NoSQL database that stores user authentication and player avatar details. A custom module is used to manage the database connection.
    - Motivation: It is relatively easy to get started with and provides good documentation. It is among the more popular NoSQL databases.
- Authentication: A custom module is used to manage user authentication, with the use of [JSON Web Tokens](https://jwt.io/), as well as [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password encryption
    - Motivation: JSON Web Tokens are easy to set up and work with, both on the backend and frontend
- [Jest](https://jestjs.io/): a test runner
    - Motivation: Jest is used by default in the frontend part of the project, so using the same tool for the backend makes sense. Also, Jest provides code coverage, which removes the need for a separate code coverage tool.
- [Docker](https://www.docker.com/get-started): Virtualization platform that gives the ability to run and test the project in different environments
    - Motivation: Once set up, Docker containers are very easy to work with

#### Evaluation
Express, MongoDB and Jest all work very smoothly with each other. They are general purpose technologies, making them all work well in the context of a realtime browser game prototype. JSON Web Tokens are easily usable in just about any environment and Docker is versatile as well. The custom chat server works for the purpose but it could be modified to integrate better with the rest of the application, at the moment it works best to run it as a separate service.

As this is only a prototype, a lot of the control is in the frontend. This means that restrictions implemented only on the frontend (e.g. restrictions on chat commands) can be bypassed, meaning that for a production-grade version of this project, more control needs to be added to the backend for security reasons.



## Installation

#### Requirements
- [Node and npm](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/download-center/community) database up and running
- `JWT_SECRET` environment variable needs to be set (see [Environment variables](#environment-variables) below for details)

#### Commands
    $ git clone https://github.com/emsa16/realtimegame-backend.git
    $ cd realtimegame-backend
    $ npm install



## Usage

#### Commands (after installation)
    $ npm start                # Runs server in development mode, using nodemon which automatically restarts server when code changes
    $ npm run production       # Runs server in production mode
    $ npm run start-chat       # Runs chat server module as a separate process (useful to get a separate console for the chat server log)

    Running the server in Docker containers
    $ npm run docker-node1     # node latest (test on http://localhost:8110)
    $ npm run docker-node2     # node 10 (test on http://localhost:8100)
    $ npm run docker-node3     # node 8 (test on http://localhost:8088)
    $ npm run docker-start     # Runs all three containers (see ports above)
    $ npm run docker-stop      # Stops all active containers
    $ npm run docker-build     # Builds images for above containers from their respective Dockerfile

#### Environment variables
The following environment variables can be set by inserting these before above commands:
- `JWT_SECRET="STRING"` - **REQUIRED** - used to create and authenticate JWT tokens, at least 64 random characters is recommended. It can also be used with Docker containers, but a default value in the containers is used if the variable is not set.
- `DBWEBB_PORT=XXXX` - set server port (default: 8080). When used with Docker containers, this sets the port that connects to the app running in the container. Default port values for the Docker containers can be seen above.
- `DBWEBB_DSN="URL"` - set address to the Mongo database (default: mongodb://localhost:27017/game). This variable does not work with Docker containers, as Docker uses a separate container running a Mongo database (see [Running in Docker section](#running-in-docker)).
- `START_CHAT=true` - start chat server at the same time as web server (not when running chat server as a separate process) (default: null). It can also be used with Docker containers.

The chat server module has its own environment variables that can also be set in combination with these commands. See its [documentation](https://www.npmjs.com/package/@emsa16/chat-server) for more information. When used with Docker containers, the `WS_DBWEBB_PORT` variable sets the port that connects to the chat server running inside the Docker container. The default values are 1556 for node1, 1557 for node2, and 1558 for node3. Other environment variables in the chat server module cannot be used with Docker containers.



## API
The web server offers a JSON REST API that facilitates authentication and database services for the frontend part of this project. Parameters are put in the request body. Here is a summary of the API:

- /login
    - method: POST
    - parameters: username, password
    - returns: message, token (if successful authentication)    
- /register
    - method: POST
    - parameters: username, password
    - return value: message
- /player
    - method: GET
    - headers: x-access-token (use login token)
    - returns on success: model, nickname, position
    - returns on fail: message
- /player-upsert
    - method: POST
    - headers: x-access-token (use login token)
    - parameters: nickname, model
    - returns on success: status, message
    - returns on fail: message



## Tests
The test suite consists of the following tools:
- [Jest](https://jestjs.io/): Runs the unit tests that are found in the `/test` catalog. Jest is used by default in the frontend part of the project, so using the same tool for the backend makes sense. Also, Jest provides code coverage, which removes the need for a separate code coverage tool.
- [Supertest](https://github.com/visionmedia/supertest): assists Jest by providing the tools to send HTTP requests to the server inside unit tests, making it possible to test the external API
- [jest-mongodb](https://github.com/shelfio/jest-mongodb): assists Jest by giving the tools to mock a Mongo database so that the database module can be tested
- [stylelint](https://stylelint.io/): lints CSS files
- [eslint](https://eslint.org/): lints JavaScript files

#### Commands (after installation)
    $ npm test                 # Runs the complete test suite
    $ npm run stylelint        # Runs CSS linter only
    $ npm run eslint           # Runs JavaScript linter only

    Running tests in Docker containers
    $ npm run test-node1       # Runs npm test inside node1 container
    $ npm run test-node2       # Runs npm test inside node2 container
    $ npm run test-node3       # Runs npm test inside node3 container

#### Code coverage
Jest includes code coverage, which is printed to the console at the end of every test run. A more extensive and visual code coverage report can be viewed in the browser by opening `coverage/lcov-report/index.html` (which can be found after tests are run).

The tests cover 88% of the project. Getting to this coverage was generally not too difficult once it was understood how Jest could be used to mock functions and modules. A couple of lines were a bit tricky to reach and demanded their separate test file just to cover one line. The only parts that are not included in the tests are specific error conditions that are hard (impossible?) to replicate. These include errors with the database, in the router handling, headers already being sent and the id key missing from decoded authentication tokens (which should not be possible).

#### Evaluation
The tools for unit testing all work very well together and makes testing rather straightforward, without the tests getting too convoluted and still getting good code coverage. The CSS linter is not actually needed in this project, and is a leftover from importing the test environment from another project.



## Running in Docker
Docker containers use their own, separate container running a Mongo database. The database is stored in `/data/db` and runs on port 27017. The MongoDB container is automatically managed by below commands.

    $ npm run docker-node1     # node latest (test on http://localhost:8110)
    $ npm run docker-node2     # node 10 (test on http://localhost:8100)
    $ npm run docker-node3     # node 8 (test on http://localhost:8088)

    $ npm run docker-start     # Runs all containers (see ports above)
    $ npm run docker-stop      # Stops all active containers
    $ npm run docker-build     # Builds above images from their respective Dockerfile

    $ npm run test-node1       # Runs npm test inside node1 container
    $ npm run test-node2       # Runs npm test inside node2 container
    $ npm run test-node3       # Runs npm test inside node3 container



## CI
The CI chain consists of the following tools, which all have their badges included at the top of this document:
- [Travis](https://travis-ci.org/emsa16/realtimegame-backend): Build tool, provides Code Climate with code coverage report
- [CircleCI](https://circleci.com/gh/emsa16/realtimegame-backend): Build tool
- [Code Climate](https://codeclimate.com/github/emsa16/realtimegame-backend): Code quality analysis and code coverage (two separate badges)
- [Better Code Hub](https://bettercodehub.com/results/emsa16/realtimegame-backend): Code quality analysis

The reason for having two build tools and two code quality tools is for redundancy. The tools all work a bit differently from each other, and an issue might go past one of the tools but is then picked by another. All of the tools provide a nice user interface which is why these tools are chosen instead of other alternatives.

#### Limitations
There are some limitations to keep in mind, which are not exclusive to above tools. The build tools install the project and run the `npm test` command, but they never actually run the project, meaning that issues that are not visible to unit tests might go unnoticed, e.g. that a database is present and running or the selected ports are available. The code quality tools can only perform static code analysis, meaning that they might grade parts of the code unfairly, or miss less obvious issues.

#### Evaluation
At times, builds fail because of some issue that needs to be fixed. Other times, the issue only exists in the build tool environment but nowhere else and adjustments have to be made only to satisfy the build tool, which is unfortunate. When all is going well however, these tools are not really noticed, meaning that they give some assurance that the project is working, without needing much attention from the developer. However, the risk is, especially with the code quality tools, that you become blind to the grade inside the badge and don't really think to try and fix some of the issues discovered by the tool.

Apart from needing a little bit extra setup to send the code coverage report from Travis to Code Climate, these tools work well in this project.

Code Climate rates this project a D. Looking at the comments it feels a bit unfair to get that low a grade, as it boils down to one somewhat too complex function and a bit of repetitive code that might be quite hard to refactor. Better Code Hub rates this project a 6/10. It has quite rigid requirements regarding code length, and it also mentions repeating code. All in all, the grades seem a bit low, as the issues are not that severe.



## Realtime / NPM module
The realtime aspect of this project is a WebSocket server that is implemented in the external NPM [module](https://www.npmjs.com/package/@emsa16/chat-server) that the author created earlier. The module itself uses Express and WebSocket through the [ws](https://github.com/websockets/ws) module to provide a server that facilitates realtime communication to the chat and the game world in this project.

The chat server can be started in one of two ways in this project:

    Run chat server module as a separate process
    $ npm run start-chat

    Start chat server at the same time as the web server (taking other environment variables into account as well, see section above)
    $ START_CHAT=true npm start
    $ START_CHAT=true npm run production

#### Motivation
As this module has a very simple implementation and the author is very familiar with it, as well as the possibility to modify the module for this project's needs, it was the obvious choice for the realtime aspect.

The motivation for choosing the chat server to become the public module was that from the start, this code was created separately from the other parts, earlier in the course, so it was only natural to make this into an NPM module. There are alternatives that could have been chosen, both the authentication and the database module are fairly independent, but these modules are quite small, so it made the most sense to take the chat server, which is a little bit bigger.

#### Evaluation
The chat server module functionally needed to be extended slightly in order to work both as a regular chat server as well as facilitating player movement in the game world, so that all players get movement updates in realtime as well. The additional functionality does not affect its capability to function as a regular chat server, but the functionality had to be added in the module instead of in this project, due to the way the module is built and exposes very little to the surrounding application. The functionalities needed for the game prototype were almost identical to the original module, so the adjustments were not big.

The chat server module works for the purpose but it could be modified to integrate better with the rest of the application, at the moment it works best to run it as a separate service, which gives it a separate terminal console for its log.

When working with JavaScript on the server side, NPM is at the absolute core of that workflow. As a sole developer building custom modules, it might not make much sense to publish these modules to NPM. However, if the module is well-built, i.e. it is independent, exposes a carefully defined API and can be used in versatile contexts, publishing it on NPM makes it easier to move around, so especially if the same code is used on multiple projects, it might be a good idea.



## Database
This project uses the [MongoDB](https://www.mongodb.com/download-center/community) NoSQL database to store user credentials and details about the players' avatars. It integrates with both the REST API and the chat server. When a user enters the game world, this command is sent to the chat server, which then looks up the player details in the database and sends it to all other users that are in-game (and thus also connected to the chat). Each time an avatar is moved, this is sent to the chat server, which updates the database with the current position.

The reason for choosing MongoDB is that it is relatively easy to get started with and provides good documentation. The author's previous experience with MongoDB also gave assurance that it would be easy to use in this project. There was no need for complex database setup, writing SQL to define databases and tables. Finally, MongoDB is among the more popular NoSQL databases, which also supported the decision to choose it.

There has been no issues at all working with MongoDB in this project. As there is no need to define the database tables beforehand, getting started with the database was basically as simple as starting the database and connecting to it. However, although it can be this easy, this is not the recommended way to work with databases of any kind. Traditional relational databases enforce strict rules on the structure and contents in the database, and although it takes more time to get started, the safety this provides makes up for it. For all of these reasons, it is very likely that the author will continue using both SQL and NoSQL databases in the future.



BTH 2019
