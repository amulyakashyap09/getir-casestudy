const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecordsSchema = new Schema(
  {
    key: String,
    value: String,
    createdAt: Date,
    counts: [Number],
  },
  {
    timestamps: true,
  }
);

module.exports = RecordsSchema;
