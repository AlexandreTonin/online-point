const RoleController = require("../controllers/RoleController");

const router = require("express").Router();

router.post("/create", RoleController.createRole);

module.exports = router;