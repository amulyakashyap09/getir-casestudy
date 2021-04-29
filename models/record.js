const mongoose = require("mongoose");
const RecordsSchema = require("./schema/record");
module.exports = mongoose.model("records", RecordsSchema);
