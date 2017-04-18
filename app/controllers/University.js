const Joi = require('joi');

const University = require('../models').University;
const validators = require('../validators');
const responses = require('../responses');

// [GET] /university
exports.getAllUniversities = {
  handler: (req, res) => {
    University.findAll()
      .then((result) => {
        res({
          status: 'Success',
          data: result,
        });
      });
  },
};

// [GET] /university/{id}
exports.getUniversityById = {
  handler: (req, res) => {
    const id = req.params.id;

    University.findById(id)
      .then((result) => {
        if (!result) {
          return res(responses.notFound('university'));
        }
        return res(result);
      });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [POST] /university
exports.createUniversity = {
  handler: (req, res) => {
    const payload = req.payload;
    return University.create(payload)
      .then((result) => { res(result); })
      .catch(() => { res(responses.internalError('create', 'university')); });
  },
  validate: {
    payload: validators.University.payload,
  },
};

// [PUT] /university/{id}
exports.updateUniversityById = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;

    University.findById(id)
      .then((university) => {
        if (!university) {
          return res(responses.notFound('university'));
        }

        return university.updateAttributes(payload)
          .then((result) => { res(result); });
      });
  },
  validate: {
    payload: validators.University.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [DELETE] /university/{id}
exports.deleteUniversityById = {
  handler: (req, res) => {
    const id = req.params.id;

    University.findById(id)
      .then((university) => {
        if (!university) {
          return res(responses.notFound('university'));
        }

        return university.destroy({
          where: { id },
        }).then((result) => {
          if (!result) {
            return res(responses.internalError('delete', 'university'));
          }

          return res(responses.successDelete('university'));
        });
      });
  },
  validate: {
    payload: validators.University.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};
