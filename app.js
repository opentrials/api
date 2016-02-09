const config = require('./config');
const SwaggerHapi = require('swagger-hapi');
const Hapi = require('hapi');
const app = new Hapi.Server();

SwaggerHapi.create(config.swaggerHapi, (err, swaggerHapi) => {
  const port = config.port;
  if (err) { throw err; }

  app.connection({ port });
  app.address = () => ({ port });

  app.register(swaggerHapi.plugin, (_err) => {
    if (_err) { throw _err; }
    app.start(() => undefined);
  });
});

module.exports = app; // for testing
