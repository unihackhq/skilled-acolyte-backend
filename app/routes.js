const controllers = require('./controllers');

// transform the route options to include CORS access control options
const t = options => ({ cors: { origin: 'ignore' }, ...options });

module.exports = [
  { method: 'GET', path: '/api/v1/test', options: t(controllers.Example.get) },

  { method: 'POST', path: '/api/v1/token', options: t(controllers.Token.validate) },
  { method: 'GET', path: '/api/v1/token/{email}', options: t(controllers.Token.request) },

  { method: 'GET', path: '/api/v1/universities', options: t(controllers.University.list) },
  { method: 'GET', path: '/api/v1/universities/{id}', options: t(controllers.University.get) },
  { method: 'POST', path: '/api/v1/universities', options: t(controllers.University.create) },
  { method: 'PUT', path: '/api/v1/universities/{id}', options: t(controllers.University.update) },
  { method: 'DELETE', path: '/api/v1/universities/{id}', options: t(controllers.University.delete) },

  { method: 'GET', path: '/api/v1/events', options: t(controllers.Event.getAllEvents) },
  { method: 'POST', path: '/api/v1/events', options: t(controllers.Event.createEvent) },
  { method: 'GET', path: '/api/v1/events/{id}', options: t(controllers.Event.getEventById) },
  { method: 'PUT', path: '/api/v1/events/{id}', options: t(controllers.Event.updateEventById) },
  { method: 'DELETE', path: '/api/v1/events/{id}', options: t(controllers.Event.deleteEventById) },

  { method: 'GET', path: '/api/v1/student_directory', options: t(controllers.Student.getStudentDirectory) },
  { method: 'GET', path: '/api/v1/students', options: t(controllers.Student.getAllStudents) },
  { method: 'POST', path: '/api/v1/students', options: t(controllers.Student.createStudent) },
  { method: 'GET', path: '/api/v1/students/{id}', options: t(controllers.Student.getStudentById) },
  { method: 'PUT', path: '/api/v1/students/{id}', options: t(controllers.Student.updateStudentById) },
  { method: 'GET', path: '/api/v1/students/{id}/teams', options: t(controllers.Student.getStudentTeamsById) },
  { method: 'POST', path: '/api/v1/students/{id}/teams', options: t(controllers.Student.assignTeam) },
  { method: 'GET', path: '/api/v1/students/{id}/invites', options: t(controllers.Student.getStudentInvitesById) },

  { method: 'GET', path: '/api/v1/users', options: t(controllers.User.list) },
  { method: 'GET', path: '/api/v1/users/{id}', options: t(controllers.User.get) },
  { method: 'POST', path: '/api/v1/users', options: t(controllers.User.create) },
  { method: 'PUT', path: '/api/v1/users/{id}', options: t(controllers.User.update) },
  { method: 'DELETE', path: '/api/v1/users/{id}', options: t(controllers.User.delete) },

  { method: 'GET', path: '/api/v1/teams', options: t(controllers.Team.getAllTeams) },
  { method: 'POST', path: '/api/v1/teams', options: t(controllers.Team.createTeam) },
  { method: 'GET', path: '/api/v1/teams/{id}', options: t(controllers.Team.getTeamById) },
  { method: 'PUT', path: '/api/v1/teams/{id}', options: t(controllers.Team.updateTeamById) },
  { method: 'DELETE', path: '/api/v1/teams/{id}', options: t(controllers.Team.deleteTeamById) },
  { method: 'GET', path: '/api/v1/teams/{id}/members', options: t(controllers.Team.getTeamMembers) },
  { method: 'GET', path: '/api/v1/teams/{id}/invites', options: t(controllers.Team.getTeamInvitesById) },
  { method: 'POST', path: '/api/v1/teams/{id}/invites', options: t(controllers.Team.createTeamInvite) },

  { method: 'POST', path: '/api/v1/prepopulate/event', options: t(controllers.Prepopulate.prepopulateEvent) },
  { method: 'POST', path: '/api/v1/prepopulate/attendees', options: t(controllers.Prepopulate.prepopulateAttendees) },
];
