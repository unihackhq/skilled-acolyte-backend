const controllers = require('./controllers');

module.exports = [
  { method: 'GET', path: '/api/v1/test', config: controllers.Example.get },

  { method: 'GET', path: '/api/v1/universities', config: controllers.University.getAllUniversities },
  { method: 'POST', path: '/api/v1/universities', config: controllers.University.createUniversity },
  { method: 'GET', path: '/api/v1/universities/{id}', config: controllers.University.getUniversityById },
  { method: 'PUT', path: '/api/v1/universities/{id}', config: controllers.University.updateUniversityById },
  { method: 'DELETE', path: '/api/v1/universities/{id}', config: controllers.University.deleteUniversityById },

  { method: 'GET',    path: '/api/v1/events',       config: controllers.Event.getAllEvents     },
  { method: 'POST',   path: '/api/v1/events',       config: controllers.Event.createEvent      },
  { method: 'GET',    path: '/api/v1/events/{id}',  config: controllers.Event.getEventById     },
  { method: 'PUT',    path: '/api/v1/events/{id}',  config: controllers.Event.updateEventById  },
  { method: 'DELETE', path: '/api/v1/events/{id}',  config: controllers.Event.deleteEventById  }
];
