const controllers = require('./controllers');

module.exports = [
  { method: 'GET', path: '/api/v1/test', config: controllers.Example.get },
  { method: 'GET', path: '/api/v1/universities', config: controllers.University.index },
  { method: 'POST', path: '/api/v1/universities', config: controllers.University.post },
  { method: 'GET', path: '/api/v1/universities/{id}', config: controllers.University.get },
  { method: 'PUT', path: '/api/v1/universities/{id}', config: controllers.University.put },
  { method: 'DELETE', path: '/api/v1/universities/{id}', config: controllers.University.delete },
];
