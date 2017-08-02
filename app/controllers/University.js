const Joi = require('joi');

const UniversityService = require('../services/UniversityService');
const Errors = require('../errors');
const validators = require('../validators');

// [GET] /university
exports.getAllUniversities = {
  handler: (req, res) => {
    UniversityService.listAll((err, results) => {
      if (err) return res(Errors.handler(err));
      return res({ status: 'Success', results });
    });
  },
};

// [GET] /university/{id}
exports.getUniversityById = {
  handler: (req, res) => {
    const id = req.params.id;
    UniversityService.getUniversity(id, (err, result) => {
      if (err) return res(Errors.handler(err));
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
    UniversityService.createUniversity(payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
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
    UniversityService.updateUniversity(id, payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
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
    UniversityService.deleteUniversity(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.University.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};
