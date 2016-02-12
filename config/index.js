'use strict';

const path = require('path');
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 10010,

  swaggerHapi: {
    appRoot: path.join(__dirname, '..'),
  },

  hapi: {
    plugins: [{
      register: require('good'),
      options: {
        reporters: [{
          reporter: require('good-console'),
          events: { log: '*', reponse: '*' },
        }],
      },
    }],
  },
};

const knexConfig = require(path.join(__dirname, '..', './knexfile'))[config.env];
const knex = require('knex')(knexConfig);
config.bookshelf = require('bookshelf')(knex);

module.exports = config;
