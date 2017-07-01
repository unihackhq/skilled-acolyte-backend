const Hapi = require('hapi');

const env = require('./env');
const routes = require('./app/routes');
const models = require('./app/models');
const validate = require('./app/util/Token');

const app = new Hapi.Server();

// Define host and port
app.connection({ host: env.API_HOST, port: env.API_PORT, routes: { cors: { origin: ['*'] } } });

// TODO: Move to utils/

// Register the JWT authentication plugin
app.register([
  {
    register: require('hapi-auth-jwt2'),
  },
], (err) => {
  if (err) throw err;

  // JWT is the authentication strategy
  app.auth.strategy('jwt', 'jwt', {
    key: env.JWT_KEY,
    validateFunc: validate,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Register the routes, stored in routes.js
  app.route(routes);
});

// If we're not running tests, pretty print request/response
// TODO: Use good, good-console and good-squeeze
if (!env.TESTING) {
  app.on('response', (request) => {
    console.log(`Payload: ${JSON.stringify(request.payload)}`);
    console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.path} --> ${request.response.statusCode}`);
  });
}

// Start the app
const options = {};
if (env.DEV) {
  options.force = true;
}
models.sequelize.sync(options).then(() => {
  app.start((err) => {
    if (err) throw err;
    console.log(`Started. Running on http://${env.API_HOST}:${env.API_PORT}`);
  });
});

module.exports = app;
