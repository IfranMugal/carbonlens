const express = require("express");
const router = express.Router();

const { loginOrSignup, getUserProfile } = require("../controllers/userController");

router.post("/users/login", loginOrSignup);
router.get("/users/profile", getUserProfile);

module.exports = router;
