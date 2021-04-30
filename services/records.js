const recordModel = require("../models/record");

/**
 * findAll finds all the record present in the collection
 * default skip limit 0, 100 respectively
 * @returns [{*}] records
 */
const findAll = async (skip = 0, limit = 100) => {
  const resp = {};
  try {
    resp["data"] = await recordModel.find().skip(skip).limit(limit);
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

const bulkInsert = async (data = []) => {
  if (data.length) {
    await recordModel.insertMany(data);
  }
};

module.exports = { findAll, aggregate, bulkInsert };
