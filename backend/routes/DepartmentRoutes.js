const DepartmentController = require("../controllers/DepartmentController");

const router = require("express").Router();

router.post("/create", DepartmentController.createDepartment);

module.exports = router;