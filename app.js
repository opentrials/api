const config = require('./config');
const SwaggerHapi = require('swagger-hapi');
const Hapi = require('hapi');
const app = new Hapi.Server();

SwaggerHapi.create(config.swaggerHapi, (err, swaggerHapi) => {
  const port = config.port;
  const plugins = [swaggerHapi.plugin,
                   ...config.hapi.plugins];
  if (err) { throw err; }

  app.connection({ port });
  app.address = () => ({ port });


  app.register(plugins, (_err) => {
    if (_err) { throw _err; }
    app.start(() => {
      console.info('Server started at', app.info.uri); // eslint-disable-line no-console
    });
  });
});

module.exports = app; // for testing
