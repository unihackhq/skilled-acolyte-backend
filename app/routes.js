const {
  token,
  university,
  event,
  student,
  user,
  team,
  prepopulate
} = require('./controllers');

// transform the route options to include CORS access control options
const t = options => ({ cors: { origin: 'ignore' }, ...options });

module.exports = [
  { method: 'POST', path: '/api/v1/token', options: t(token.validate) },
  { method: 'GET', path: '/api/v1/token/{email}', options: t(token.request) },

  { method: 'GET', path: '/api/v1/universities', options: t(university.list) },
  { method: 'GET', path: '/api/v1/universities/{id}', options: t(university.get) },
  { method: 'POST', path: '/api/v1/universities', options: t(university.create) },
  { method: 'PUT', path: '/api/v1/universities/{id}', options: t(university.update) },
  { method: 'DELETE', path: '/api/v1/universities/{id}', options: t(university.delete) },

  { method: 'GET', path: '/api/v1/events', options: t(event.list) },
  { method: 'GET', path: '/api/v1/events/{id}', options: t(event.get) },
  { method: 'POST', path: '/api/v1/events', options: t(event.create) },
  { method: 'PUT', path: '/api/v1/events/{id}', options: t(event.update) },
  { method: 'DELETE', path: '/api/v1/events/{id}', options: t(event.delete) },

  { method: 'GET', path: '/api/v1/students', options: t(student.list) },
  { method: 'GET', path: '/api/v1/students/directory', options: t(student.directory) },
  { method: 'GET', path: '/api/v1/students/{id}', options: t(student.get) },
  { method: 'GET', path: '/api/v1/students/{id}/teams', options: t(student.teams) },
  { method: 'POST', path: '/api/v1/students', options: t(student.create) },
  { method: 'PUT', path: '/api/v1/students/{id}', options: t(student.update) },
  { method: 'DELETE', path: '/api/v1/students/{id}', options: t(student.delete) },

  { method: 'GET', path: '/api/v1/students/{id}/invites', options: t(student.invites) },
  { method: 'POST', path: '/api/v1/students/{studentId}/invites/{teamId}/accept', options: t(student.acceptInvite) },
  { method: 'POST', path: '/api/v1/students/{studentId}/invites/{teamId}/reject', options: t(student.rejectInvite) },

  { method: 'GET', path: '/api/v1/users', options: t(user.list) },
  { method: 'GET', path: '/api/v1/users/{id}', options: t(user.get) },
  { method: 'POST', path: '/api/v1/users', options: t(user.create) },
  { method: 'PUT', path: '/api/v1/users/{id}', options: t(user.update) },
  { method: 'DELETE', path: '/api/v1/users/{id}', options: t(user.delete) },

  { method: 'GET', path: '/api/v1/teams', options: t(team.list) },
  { method: 'GET', path: '/api/v1/teams/{id}', options: t(team.get) },
  { method: 'GET', path: '/api/v1/teams/{id}/members', options: t(team.members) },
  { method: 'GET', path: '/api/v1/teams/{id}/invites', options: t(team.invites) },
  { method: 'POST', path: '/api/v1/teams', options: t(team.create) },
  { method: 'POST', path: '/api/v1/teams/{id}/invites', options: t(team.invite) },
  { method: 'PUT', path: '/api/v1/teams/{id}', options: t(team.update) },
  { method: 'DELETE', path: '/api/v1/teams/{id}', options: t(team.delete) },

  { method: 'POST', path: '/api/v1/prepopulate/event', options: t(prepopulate.event) },
  { method: 'POST', path: '/api/v1/prepopulate/attendees', options: t(prepopulate.attendees) },
];
