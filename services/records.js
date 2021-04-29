const recordModel = require("../models/record");

/**
 * findAll finds all the record present in the collection
 * default skip limit 0, 10 respectively
 * @returns [{*}] records
 */
const findAll = async () => {
  const resp = {};
  try {
    resp["data"] = await recordModel.find();
  } catch (error) {
    console.error(error);
    resp["error"] = error;
  } finally {
    return resp;
  }
};

/**
 * findAll aggregates multiple pipelines
 * extracts the required data and returns
 * @returns [{*}] records
 */
const aggregate = async (pipeline) => {
  const resp = {};
  try {
    resp["data"] = await recordModel.aggregate(pipeline);
  } catch (error) {
    console.error(error);
    resp["error"] = error;
  } finally {
    return resp;
  }
};

module.exports = { findAll, aggregate };
