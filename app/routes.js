const Example = require('./controllers/Example');

module.exports = [
  { method: 'GET', path: '/api/v1/test', config: Example.exampleController },
];
