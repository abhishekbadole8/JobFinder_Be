const express = require("express");
const { userRegister } = require("../controllers/userController");
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", (req, res) => {});
router.get("/current", (req, res) => {});
module.exports = router;
