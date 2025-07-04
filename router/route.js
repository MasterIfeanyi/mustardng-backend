const express = require("express");
const router = express.Router();
const {register} = require("../controllers/register")
const {login} = require("../controllers/login")
const {createProudct, findUserProducts} = require("../controllers/budget")
const {protect} = require("../middleware/authMiddleware")

router.post("register", register);

router.post("login", login);

router.post("budget", protect, createProudct);

router.get("budget", protect, findUserProducts);


module.exports = router;