# api

[![Gitter](https://img.shields.io/gitter/room/opentrials/chat.svg)](https://gitter.im/opentrials/chat)
[![Travis Build Status](https://travis-ci.org/opentrials/api.svg?branch=master)](https://travis-ci.org/opentrials/api)
[![Coveralls](http://img.shields.io/coveralls/opentrials/api.svg?branch=master)](https://coveralls.io/r/opentrials/api?branch=master)
[![Dependency Status](https://david-dm.org/opentrials/api.svg)](https://david-dm.org/opentrials/api)
[![Issues](https://img.shields.io/badge/issue-tracker-orange.svg)](https://github.com/opentrials/opentrials/issues)
[![Docs](https://img.shields.io/badge/docs-latest-blue.svg)](http://docs.opentrials.net/en/latest/developers/)

The OpenTrials API service.

## Developer notes

### Requirements

* Node 6.9
* PostgreSQL 9.4
* ElasticSearch 2.3.5

### Installing

1. Copy the `.env.example` file to `.env` and alter its contents as needed.
   At minimum, you should set the `DATABASE_URL` and `ELASTICSEARCH_URL`. The
   `TEST_DATABASE_URL` is needed to run the tests. You could leave the
   `ELASTICSEARCH_AWS_*` as is if you're not using ElasticSearch on AWS;
2. Run `npm install`;
3. Run `npm run migrate`;
4. (Optional) If you want, you can add some seed data using `npm run seed`;
5. Run `npm run reindex`;

After the install and migrations ran successfully, you can run `npm run dev` to
run the project. If you haven't changed the default `PORT`, it should be
available at `http://localhost:5000`

### Reindexing

Currently, there's no way to automatically reindex the data. Every time you
change the database, you'd need to run `npm run reindex` to keep ElasticSearch
in sync.

### Testing

You can run the test suite and linting with `npm test`.

### Interacting with the API

You can find and interact [here](https://api.opentrials.net/v1/docs/) with the available endpoints.

Seems like some of the packages need to be updated