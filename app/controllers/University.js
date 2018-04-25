const Joi = require('joi');

const UniversityService = require('../services/UniversityService');
const Errors = require('../errors');
const validators = require('../validators');

// [GET] /university
exports.getAllUniversities = {
  handler: (req, res) => {
    UniversityService.listAll((err, results) => {
      if (err) return res(Errors.handler(err));
      return res(results);
    });
  },
};

// [GET] /university/{id}
exports.getUniversityById = {
  handler: (req, res) => {
    const { id } = req.params;
    UniversityService.getUniversity(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /university
exports.createUniversity = {
  handler: (req, res) => {
    const { payload } = req;
    UniversityService.createUniversity(payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.University.payload(true),
  },
};

// [PUT] /university/{id}
exports.updateUniversityById = {
  handler: (req, res) => {
    const { id } = req.params;
    const { payload } = req;
    UniversityService.updateUniversity(id, payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.University.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [DELETE] /university/{id}
exports.deleteUniversityById = {
  handler: (req, res) => {
    const { id } = req.params;
    UniversityService.deleteUniversity(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
