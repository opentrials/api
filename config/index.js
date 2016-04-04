require('dotenv').config();

if (!process.env.ELASTICSEARCH_URL) {
  // Fallback to SEARCHBOX_URL if ELASTICSEARCH_URL isn't set.
  process.env.ELASTICSEARCH_URL = process.env.SEARCHBOX_SSL_URL;
}

const elasticsearch = require('elasticsearch');
const path = require('path');
const config = {
  host: process.env.HOST || '0.0.0.0',
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
          events: { log: '*', response: '*' },
        }],
      },
    }],
  },
};

const env = process.env.NODE_ENV || 'development';
const knexConfig = require(path.join(__dirname, '..', './knexfile'))[env];
const knex = require('knex')(knexConfig);
config.bookshelf = require('bookshelf')(knex);
config.bookshelf.plugin('registry');
config.bookshelf.plugin('visibility');

// ElasticSearch
const elasticsearchConfig = {
  host: process.env.ELASTICSEARCH_URL,
};
if (process.env.ELASTICSEARCH_AWS_REGION &&
    process.env.ELASTICSEARCH_AWS_ACCESS_KEY &&
    process.env.ELASTICSEARCH_AWS_SECRET_KEY) {
  elasticsearchConfig.connectionClass = require('http-aws-es');
  elasticsearchConfig.amazonES = {
    region: process.env.ELASTICSEARCH_AWS_REGION,
    accessKey: process.env.ELASTICSEARCH_AWS_ACCESS_KEY,
    secretKey: process.env.ELASTICSEARCH_AWS_SECRET_KEY,
  };
}
config.elasticsearch = new elasticsearch.Client(elasticsearchConfig);

module.exports = config;
