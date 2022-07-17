const User = require("../schemas/User");
const { check, validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "socialmedia";


//@route /user
//@description getting all the user

exports.getUser = async (req, res) => {
  /*auth logic for login user*/
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};


//@route /user
//@description checking the login creadentials

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body; /*Login Authentication*/
  try {
    let user = await User.findOne(email);
    if (!user)
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ errors: [{ msg: "Password incorrect" }] });
    /*Payload for the data*/
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
