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
          return res(Boom.notFound('Cannot find a university with that id'));
        }
        return res(result);
      });
  },
  validate: {
    params: validators.Generic.uuid,
  },
};

// [POST] /university
exports.post = {
  handler: (req, res) => {
    const payload = req.payload;
    console.log(payload);

    return models.University.create(payload)
      .then((result) => { res(result); })
      .catch(() => { res(Boom.badImplementation()); });
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

    models.University.findById(id)
      .then((university) => {
        if (!university) {
          return res(Boom.notFound('Cannot find a university with that id'));
        }

        return university.updateAttributes(payload)
          .then((result) => { res(result); });
      });
  },
  validate: {
    payload: validators.University.payload,
    params: validators.Generic.uuid,
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
    params: validators.Generic.uuid,
  },
};
