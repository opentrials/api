'use strict';

const config = require('./config');
const SwaggerHapi = require('swagger-hapi');
const Hapi = require('hapi');
const server = new Hapi.Server();

SwaggerHapi.create(config.swaggerHapi, (err, swaggerHapi) => {
  if (err) { throw err; }

  const port = config.port;
  const plugins = [swaggerHapi.plugin,
                   ...config.hapi.plugins];

  server.connection({
    host: config.host,
    port,
    routes: {
      cors: true,
    },
  });
  server.address = () => ({ port });

  server.register(plugins, (_err) => {
    if (_err) { throw _err; }
    server.start(() => {
      console.info('Server started at', server.info.uri); // eslint-disable-line no-console
    });
  });
});

module.exports = server; // for testing
