const University = require('../models').University;

// find or create a university with name
exports.findCreateFromName = (name) => {
  return University.findOrCreate({ where: { name }, defaults: { country: 'Australia' } })
    .spread(uni => uni.get({ plain: true }));
};
