const express = require("express");
const router = express.Router();
const {register} = require("../controllers/register")
const {login} = require("../controllers/login")
const {logout} = require("../controllers/logout")
const {auth} = require("../controllers/auth")
const {createProudct, findUserProducts} = require("../controllers/budget")
const {protect} = require("../middleware/authMiddleware")
const rateLimit = require("../utils/rate-limit")

router.post("/register", register);

router.post("/login", rateLimit, login);

router.post("/budget", protect, createProudct);

router.get("/budget", protect, findUserProducts);

router.get("/me", protect, auth);

router.post('/logout', protect, logout)

module.exports = router;