const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      let token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (error, decoded) => {
        if (error) {
          res.status(401);
          throw new Error("User is not authorized!",error.message);
        }
        req.id = decoded.id; // Verify token relation with user
        next();
      });

      if (!token) {
        throw new Error("User is not authorized Or token is missing!!");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = validateToken;
