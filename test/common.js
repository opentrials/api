process.env.NODE_ENV = 'test';

const config = require('../config');
const server = require('../server');
const fixtures = require('./fixtures');

global.config = config;
global.server = server;
global.fixtures = fixtures;
