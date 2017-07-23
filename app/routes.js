const controllers = require('./controllers');

module.exports = [
  { method: 'GET', path: '/api/v1/test', config: controllers.Example.get },

  { method: 'POST', path: '/api/v1/token', config: controllers.Token.validate },
  { method: 'GET', path: '/api/v1/token/{email}', config: controllers.Token.request },

  { method: 'GET', path: '/api/v1/universities', config: controllers.University.getAllUniversities },
  { method: 'POST', path: '/api/v1/universities', config: controllers.University.createUniversity },
  { method: 'GET', path: '/api/v1/universities/{id}', config: controllers.University.getUniversityById },
  { method: 'PUT', path: '/api/v1/universities/{id}', config: controllers.University.updateUniversityById },
  { method: 'DELETE', path: '/api/v1/universities/{id}', config: controllers.University.deleteUniversityById },

  { method: 'GET', path: '/api/v1/events', config: controllers.Event.getAllEvents },
  { method: 'POST', path: '/api/v1/events', config: controllers.Event.createEvent },
  { method: 'GET', path: '/api/v1/events/{id}', config: controllers.Event.getEventById },
  { method: 'PUT', path: '/api/v1/events/{id}', config: controllers.Event.updateEventById },
  { method: 'DELETE', path: '/api/v1/events/{id}', config: controllers.Event.deleteEventById },

  { method: 'GET', path: '/api/v1/students', config: controllers.Student.getAllStudents },
  { method: 'POST', path: '/api/v1/students', config: controllers.Student.createStudent },
  { method: 'GET', path: '/api/v1/students/{id}', config: controllers.Student.getStudentById },
  { method: 'PUT', path: '/api/v1/students/{id}', config: controllers.Student.updateStudentById },

  { method: 'GET', path: '/api/v1/users', config: controllers.User.getAllUsers },
  { method: 'POST', path: '/api/v1/users', config: controllers.User.createUser },
  { method: 'GET', path: '/api/v1/users/{id}', config: controllers.User.getUserById },
  { method: 'PUT', path: '/api/v1/users/{id}', config: controllers.User.updateUserById },
  { method: 'DELETE', path: '/api/v1/users/{id}', config: controllers.User.deleteUserById },

  { method: 'GET', path: '/api/v1/teams', config: controllers.Team.getAllTeams },
  { method: 'POST', path: '/api/v1/teams', config: controllers.Team.createTeam },
  { method: 'GET', path: '/api/v1/teams/{id}', config: controllers.Team.getTeamById },
  { method: 'PUT', path: '/api/v1/teams/{id}', config: controllers.Team.updateTeamById },
  { method: 'DELETE', path: '/api/v1/teams/{id}', config: controllers.Team.deleteTeamById },
];
