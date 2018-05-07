const _ = require('lodash');

exports.student = student => _.pick(student, ['id', 'photoUrl', 'user.id', 'user.preferredName', 'user.lastName']);

exports.event = event => _.pick(event, ['id', 'photoUrl', 'name']);
