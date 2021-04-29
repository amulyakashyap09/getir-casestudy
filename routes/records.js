var express = require("express");
var router = express.Router();
var inputSanitisation = require("../middlewares/inputSanitisation");
var recordController = require("../controllers/records");

/* GET all records. */
router.get("/", recordController.welcome);

/* GET all records. */
router.get("/records", recordController.fetchAllRecords);

/* POST filter the records. */
router.post(
  "/filter-records",
  inputSanitisation.filterRecordApiValidation,
  recordController.filterRecords
);

module.exports = router;
