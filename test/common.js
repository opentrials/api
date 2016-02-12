process.env.NODE_ENV = 'test';

const config = require('../config');
const server = require('../server');

global.config = config;
global.server = server;
