const RoleController = require("../controllers/RoleController");

const router = require("express").Router();

router.post("/create", RoleController.createRole);
router.get("/:id", RoleController.readRole);
router.patch("/update/:id", RoleController.updateRole);
router.delete("/delete/:id", RoleController.deleteRole);

module.exports = router;