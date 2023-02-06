require("dotenv/config");
const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).send({ error: 'No token provided.' });
    }
    // const authToken = token.split(" ")[1];
    // if (!authToken) {
    //   return res.status(401).json({
    //     errors: {
    //       authentication: "Please Login first",
    //     },
    //   });
    // }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(404).send({ error: 'Invalid token.' });
      }
      
      req.user = decoded.id;
      next();
      return res.status(200)
    });
  }
module.exports = authenticate;
