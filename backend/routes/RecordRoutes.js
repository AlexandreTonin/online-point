const router = require("express").Router();
const RecordController = require("../controllers/RecordController");

router.post("/add", RecordController.AddRecord);

module.exports = router;