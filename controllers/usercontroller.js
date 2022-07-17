const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
const jwtsecret = "socialmediaapp";
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
/*
@Route to /user
@description create user and return user token
*/
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    user = new User({
      name,
      email,
      password,
    });

    /*salt preperation*/
    const salt = await bcrypt.genSalt(10); /*10 rounds*/
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, jwtsecret, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
  }
};
