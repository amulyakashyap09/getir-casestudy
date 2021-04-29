const dateJoi = require("@joi/date");
const Joi = require("joi").extend(dateJoi);

/**
 * This validates the input incoming for the filter record post api
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns error if found else passes to next click tick
 */
module.exports.filterRecordApiValidation = (req, res, next) => {
  const schema = Joi.object({
    startDate: Joi.date().format("YYYY-MM-DD").required(),
    endDate: Joi.date().format("YYYY-MM-DD").required(),
    minCount: Joi.number().integer().required(),
    maxCount: Joi.number().integer().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) next(error);
  next();
};
