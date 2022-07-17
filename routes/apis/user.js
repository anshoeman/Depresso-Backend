const express = require("express");
const router = express.Router();
const { createUser } = require("../../controllers/usercontroller");
const { check, validationResult } = require("express-validator");
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password length more than 6").isLength({
      min: 6,
    }),
  ],
  createUser
);

module.exports = router;
