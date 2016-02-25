# api

[![Travis Build Status](https://travis-ci.org/opentrials/api.svg?branch=master)](https://travis-ci.org/opentrials/api)
[![Coveralls](http://img.shields.io/coveralls/opentrials/api.svg?branch=master)](https://coveralls.io/r/opentrials/api?branch=master)
[![Dependency Status](https://david-dm.org/opentrials/api.svg)](https://david-dm.org/opentrials/api)

The OpenTrials API service.

## Installing

Before installing this application, make sure you have a PostgreSQL server
running with a user and a database created for OpenTrials. Then, copy
`.env.example` to `.env` and change the `DATABASE_URL` string to point to your
PostgreSQL instance. If needed, you can also change the other configuration
options in that file.

Run `npm install` to install the dependencies, and then you can start this
application usin `npm start`.
