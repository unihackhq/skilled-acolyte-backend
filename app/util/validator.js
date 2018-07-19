const _ = require('lodash');

// produce payload validation for create operation
exports.required = (payload, requiredKeys) => {
  // split the fields
  const requiredFields = _.pick(payload, requiredKeys);
  const optionalFields = _.omit(payload, requiredKeys);

  // either required or allow null
  const requiredPayload = _.mapValues(requiredFields, value => value.required());
  const optionalPayload = _.mapValues(optionalFields, value => value.allow(null));

  // combine the payloads
  return Object.assign({}, requiredPayload, optionalPayload);
};

// produce payload validation for update operation
exports.optional = (payload, requiredKeys) => {
  // split the fields
  const requiredFields = _.pick(payload, requiredKeys);
  const optionalFields = _.omit(payload, requiredKeys);

  // allow null for optional fields
  const optionalPayload = _.mapValues(optionalFields, value => value.allow(null));
  // required doesn't need to be explicitly required, they just can't be null

  // combine the optional payload and required fields
  return Object.assign({}, requiredFields, optionalPayload);
};
