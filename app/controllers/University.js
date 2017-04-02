const Boom = require('boom');
const models = require('../models');
const schemas = require('../schemas');

// [GET] /university/{id}
exports.get = {
  handler: (req, res) => {
    const id = req.param.id;

    models.University.findById(id)
      .then((result) => {
        res({ id: result.id, name: result.name, country: result.country });
      });
  },
};

exports.post = {
  handler: (req, res) => {
    const payload = req.payload;
    console.log(payload);
    res(payload);
  },
  validate: {
    payload: schemas.University,
  },
};
