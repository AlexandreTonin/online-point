const DepartmentController = require("../controllers/DepartmentController");

const router = require("express").Router();

router.post("/create", DepartmentController.createDepartment);
router.get("/:id", DepartmentController.readDepartment);
router.patch("/update/:id", DepartmentController.updateDepartment);
router.delete("/delete/:id", DepartmentController.deleteDepartment);

module.exports = router;
