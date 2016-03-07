require('dotenv').config();
const elasticsearch = require('elasticsearch');
const path = require('path');
const config = {
  host: process.env.HOST || 'localhost',
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

  elasticsearch: new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_URL,
  }),
};

const env = process.env.NODE_ENV || 'development';
const knexConfig = require(path.join(__dirname, '..', './knexfile'))[env];
const knex = require('knex')(knexConfig);
config.bookshelf = require('bookshelf')(knex);
config.bookshelf.plugin('registry');
config.bookshelf.plugin('visibility');

module.exports = config;
