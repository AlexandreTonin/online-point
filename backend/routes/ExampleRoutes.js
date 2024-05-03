const router = require("express").Router();
const ExampleController = require("../controllers/ExampleController");

// get
router.get("/get", ExampleController.method);

//post
router.post("/post", ExampleController.method);

module.exports = router;