const express = require("express");
const router = express.Router();
const authCheck = require("../../middleware/auth");
const authControlller = require("../../controllers/authcontroller");
const { check } = require("express-validator");
router.get("/", authCheck, authControlller.getUser);
router.post(
  "/",
  [
    check("email", "Please fill email fields").isEmail(),
    check("password", "Please fill password"),
  ],
  authControlller.authenticateUser
);
module.exports = router;
