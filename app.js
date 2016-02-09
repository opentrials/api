const SwaggerHapi = require('swagger-hapi');
const Hapi = require('hapi');
const app = new Hapi.Server();
const config = {
  appRoot: __dirname, // required config
};

SwaggerHapi.create(config, (err, swaggerHapi) => {
  const port = process.env.PORT || 10010;
  if (err) { throw err; }

  app.connection({ port });
  app.address = () => ({ port });

  app.register(swaggerHapi.plugin, (_err) => {
    if (_err) { throw _err; }
    app.start(() => undefined);
  });
});

module.exports = app; // for testing
