const JWT = require('jsonwebtoken');

const env = require('../../env');
const populate = require('./populateScope');

exports.validate = async (decoded) => {
  if (!decoded.type) return { isValid: false };
  return populate(decoded);
};

exports.create = user => JWT.sign(user, env.JWT_KEY, {
  expiresIn: '30d',
});
