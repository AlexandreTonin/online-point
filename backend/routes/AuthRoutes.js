const router = require("express").Router();
const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.post("/logout", AuthController.Logout);
router.post("/reset", AuthController.ResetPassword);

module.exports = router;