'use strict';

const config = require('./config');
const fs = require('fs');
const path = require('path');
const SwaggerHapi = require('swagger-hapi');
const Hapi = require('hapi');

function setupSwaggerUi(server) {
  const swaggerUiPath = path.join(__dirname, './node_modules/swagger-ui/dist');
  const indexPath = path.join(swaggerUiPath, 'index.html');

  // Configure the Swagger file URL
  const swaggerUiIndex = fs.readFileSync(indexPath, 'utf8');
  const contents = swaggerUiIndex.replace(/url = ".+";/,
                                          `url = "${config.url}/v1/swagger.yaml";`);
  fs.writeFileSync(indexPath, contents, 'utf8');

  server.route({
    method: 'GET',
    path: '/v1/docs/{param*}',
    handler: {
      directory: {
        path: swaggerUiPath,
      },
    },
    config: {
      cache: {
        expiresIn: 7 * 24 * 60 * 60 * 1000,
      },
    },
  });
}

function startServer() {
  const server = new Hapi.Server();

  SwaggerHapi.create(config.swaggerHapi, (err, swaggerHapi) => {
    if (err) { throw err; }

    const port = config.port;
    const plugins = [
      swaggerHapi.plugin,
      ...config.hapi.plugins,
    ];

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

      setupSwaggerUi(server);
      server.start(() => {
        console.info('Server started at', server.info.uri); // eslint-disable-line no-console
      });
    });
  });

  return server;
}

module.exports = startServer(); // for testing
