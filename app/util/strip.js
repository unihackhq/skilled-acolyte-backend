const _ = require('lodash');

exports.student = student => _.pick(student, ['id', 'photoUrl', 'user.id', 'user.preferredName', 'user.lastName']);

exports.event = event => _.pick(event, ['id', 'name', 'location', 'logoUrl']);

exports.team = (team) => {
  const striped = _.pick(team, ['id', 'name', 'shortDescription', 'stack', 'devpostLink', 'longDescription', 'photoUrl', 'eventId']);

  // add striped members and invited
  if (team.members) {
    Object.assign(striped, {
      members: team.members.map(student => exports.student(student)),
    });
  }
  if (team.invited) {
    Object.assign(striped, {
      invited: team.invited.map(student => exports.student(student)),
    });
  }

  return striped;
};
