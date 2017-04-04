const Boom = require('boom');
const models = require('../models');
const validators = require('../validators');

// [GET] /university
exports.index = {
  handler: (req, res) => {
    const id = req.params.id;
  },
};

// [GET] /university/{id}
exports.get = {
  handler: (req, res) => {
    const id = req.params.id;

    models.University.findById(id)
      .then((result) => {
        if (!result) {
          return res(Boom.notFound('There is no university with that ID.'));
        }

        return res({
          id: result.id,
          name: result.name,
          country: result.country,
          createdAt: result.createdAt,
          lastUpdated: result.updatedAt,
        });
      });
  },
};

// [POST] /university
exports.post = {
  handler: (req, res) => {
    const payload = req.payload;
    console.log(payload);

    models.University.create(payload)
      .then((result) => {
        const response = {
          id: result.id,
          name: result.name,
          country: result.country,
        };
        return res(response);
      })
      .catch((err) => {
        console.error(err);
        return res(Boom.badImplementation());
      });
  },
  validate: {
    payload: validators.University.payload,
  },
};

// [PUT] /university/{id}
exports.put = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;
    console.log(payload);
    res(payload);
  },
  validate: {
    payload: validators.University.payload,
  },
};

// [DELETE] /university/{id}
exports.delete = {
  handler: (req, res) => {
    const id = req.params.id;
    console.log(id);
    res(id);
  },
  validate: {
    payload: validators.University.payload,
  },
};
