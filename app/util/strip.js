const _ = require('lodash');

exports.student = student => _.pick(student, ['id', 'photoUrl', 'user.id', 'user.preferredName', 'user.lastName']);

exports.event = event => _.pick(event, ['id', 'photoUrl', 'name']);

exports.team = (team) => {
  const striped = _.pick(team, ['id', 'name', 'description', 'photoUrl', 'eventId']);

  // add striped members (maybe invited too)
  Object.assign(striped, {
    members: team.members.map(student => exports.student(student)),
  });
  if (team.invited) {
    Object.assign(striped, {
      invited: team.invited.map(student => exports.student(student)),
    });
  }

  return striped;
};
