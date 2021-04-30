const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecordsSchema = new Schema(
  {
    key: String,
  },
  {
    timestamps: true,
  }
);

RecordsSchema.index({ key: 1 });

module.exports = RecordsSchema;
