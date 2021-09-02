const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (id, maxAge) => {
  const payload = {
    user: {
      id,
    },
  };

  return jwt.sign(payload, process.env.secretkey, {
    expiresIn: maxAge,
  });
};

module.exports = jwtGenerator;
