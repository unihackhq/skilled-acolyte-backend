const controllers = require('./controllers');

module.exports = [
  { method: 'GET', path: '/api/v1/test', config: controllers.Example.get },
  { method: 'POST', path: '/api/v1/university', config: controllers.University.post },
];
