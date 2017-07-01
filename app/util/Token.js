const JWT = require('jsonwebtoken');

const env = require('../../env');

exports.validate = (decoded, request, callback) =>
  // TODO:
  // If decoded._id not in user's database, then..
  // Check to see if user is not deauthorised ..
  // if (false) {
  //   return callback(null, false);
  // }
   callback(null, true);

exports.create = user => JWT.sign(user, env.JWT_KEY, {
  expiresIn: '30d',
});
