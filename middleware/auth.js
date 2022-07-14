const jsonwebtoken = require("jsonwebtoken");
const jwtsecret = "socialmedia";
/*Email and password*/
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.send({ msg: "Authorization denied" });
  try {
    const decoded = jsonwebtoken.verify(token, jwtsecret); /*This will check*/
    req.user = decoded.user;
    next(); /*next route*/
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
