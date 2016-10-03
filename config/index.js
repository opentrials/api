'use strict';

require('dotenv').config();

if (!process.env.ELASTICSEARCH_URL) {
  // Fallback to SEARCHBOX_URL if ELASTICSEARCH_URL isn't set.
  process.env.ELASTICSEARCH_URL = process.env.SEARCHBOX_SSL_URL;
}

const elasticsearch = require('elasticsearch');
const path = require('path');
const good = require('good');
const inert = require('inert');
const httpAwsEs = require('http-aws-es');

const config = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 10010,
  url: process.env.URL,

  swaggerHapi: {
    appRoot: path.join(__dirname, '..'),
  },

  hapi: {
    plugins: [{
      register: good,
      options: {
        reporters: {
          console: [
            {
              module: 'good-console',
              args: [{
                log: '*',
                response: '*',
                error: '*',
              }],
            },
          ],
        },
      },
    }, {
      register: inert,
    }],
  },
};

if (!config.url) {
  throw Error('Please set the URL environment variable to a URL like "http://www.foo.com:10010".');
}

const env = process.env.NODE_ENV || 'development';
const knexConfig = require(path.join(__dirname, '..', './knexfile'))[env];  // eslint-disable-line import/no-dynamic-require
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('visibility');
bookshelf.plugin('virtuals');
config.bookshelf = bookshelf;

// ElasticSearch
const elasticsearchConfig = {
  host: process.env.ELASTICSEARCH_URL,
  apiVersion: '2.3',
};
if (process.env.ELASTICSEARCH_AWS_REGION &&
    process.env.ELASTICSEARCH_AWS_ACCESS_KEY &&
    process.env.ELASTICSEARCH_AWS_SECRET_KEY) {
  elasticsearchConfig.connectionClass = httpAwsEs;
  elasticsearchConfig.amazonES = {
    region: process.env.ELASTICSEARCH_AWS_REGION,
    accessKey: process.env.ELASTICSEARCH_AWS_ACCESS_KEY,
    secretKey: process.env.ELASTICSEARCH_AWS_SECRET_KEY,
  };
}
config.elasticsearch = new elasticsearch.Client(elasticsearchConfig);

module.exports = config;
