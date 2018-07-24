const {
  token,
  university,
  event,
  schedule,
  student,
  user,
  team,
  prepopulate,
  ticket,
  notification,
} = require('./controllers');
const { API_URL_VERSION } = require('../env');

const prefix = `/api/v${API_URL_VERSION}`;

const routes = [
  { method: 'GET', path: `${prefix}/token`, options: token.list },
  { method: 'POST', path: `${prefix}/token/{email}`, options: token.request },
  { method: 'POST', path: `${prefix}/token`, options: token.validate },

  { method: 'GET', path: `${prefix}/universities`, options: university.list },
  { method: 'GET', path: `${prefix}/universities/{id}`, options: university.get },
  { method: 'POST', path: `${prefix}/universities`, options: university.create },
  { method: 'PUT', path: `${prefix}/universities/{id}`, options: university.update },
  { method: 'DELETE', path: `${prefix}/universities/{id}`, options: university.delete },

  { method: 'GET', path: `${prefix}/events`, options: event.list },
  { method: 'GET', path: `${prefix}/events/{id}`, options: event.get },
  { method: 'GET', path: `${prefix}/events/{id}/attendees`, options: event.attendees },
  { method: 'GET', path: `${prefix}/events/{id}/schedule`, options: event.schedule },
  { method: 'POST', path: `${prefix}/events`, options: event.create },
  { method: 'PUT', path: `${prefix}/events/{id}`, options: event.update },
  { method: 'DELETE', path: `${prefix}/events/{id}`, options: event.delete },

  { method: 'GET', path: `${prefix}/schedule/{id}`, options: schedule.get },
  { method: 'POST', path: `${prefix}/schedule`, options: schedule.create },
  { method: 'PUT', path: `${prefix}/schedule/{id}`, options: schedule.update },
  { method: 'DELETE', path: `${prefix}/schedule/{id}`, options: schedule.delete },

  { method: 'GET', path: `${prefix}/students`, options: student.list },
  { method: 'GET', path: `${prefix}/students/{id}`, options: student.get },
  { method: 'GET', path: `${prefix}/students/{id}/tickets`, options: student.tickets },
  { method: 'GET', path: `${prefix}/students/{id}/events`, options: student.events },
  { method: 'POST', path: `${prefix}/students`, options: student.create },
  { method: 'POST', path: `${prefix}/students/{id}/tickets`, options: student.addTicket },
  { method: 'PUT', path: `${prefix}/students/{id}`, options: student.update },
  { method: 'DELETE', path: `${prefix}/students/{id}`, options: student.delete },

  { method: 'GET', path: `${prefix}/students/{id}/invites`, options: student.invites },
  { method: 'POST', path: `${prefix}/students/{studentId}/invites/{teamId}/accept`, options: student.acceptInvite },
  { method: 'POST', path: `${prefix}/students/{studentId}/invites/{teamId}/reject`, options: student.rejectInvite },
  { method: 'GET', path: `${prefix}/students/{id}/teams`, options: student.teams },
  { method: 'POST', path: `${prefix}/students/{studentId}/teams/{teamId}/leave`, options: student.leaveTeam },

  { method: 'GET', path: `${prefix}/tickets`, options: ticket.list },
  { method: 'GET', path: `${prefix}/tickets/{id}`, options: ticket.get },
  { method: 'POST', path: `${prefix}/tickets/{id}/transfer`, options: ticket.transfer },

  { method: 'GET', path: `${prefix}/users`, options: user.list },
  { method: 'GET', path: `${prefix}/users/{id}`, options: user.get },
  { method: 'POST', path: `${prefix}/users`, options: user.create },
  { method: 'PUT', path: `${prefix}/users/{id}`, options: user.update },
  { method: 'DELETE', path: `${prefix}/users/{id}`, options: user.delete },

  { method: 'GET', path: `${prefix}/teams`, options: team.list },
  { method: 'GET', path: `${prefix}/teams/{id}`, options: team.get },
  { method: 'POST', path: `${prefix}/teams`, options: team.create },
  { method: 'POST', path: `${prefix}/teams/{id}/invites`, options: team.invite },
  { method: 'PUT', path: `${prefix}/teams/{id}`, options: team.update },
  { method: 'DELETE', path: `${prefix}/teams/{id}`, options: team.delete },

  { method: 'GET', path: `${prefix}/notifications/vapid-key`, options: notification.key },
  { method: 'POST', path: `${prefix}/notifications`, options: notification.send },
  { method: 'POST', path: `${prefix}/notifications/subscriptions`, options: notification.subscribe },
  { method: 'DELETE', path: `${prefix}/notifications/subscriptions/{id}`, options: notification.unsubscribe },

  { method: 'POST', path: `${prefix}/prepopulate/event`, options: prepopulate.event },
  { method: 'POST', path: `${prefix}/prepopulate/attendees`, options: prepopulate.attendees },
];

module.exports = routes;
