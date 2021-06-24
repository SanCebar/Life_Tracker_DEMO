const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

// create a func to extract JWT from the request header
const jwtFrom = ({ headers }) => {
  //check for authorization header
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }

  return undefined;
};

// a func to attach the user to the res object
const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

// create a func to verify an auth user exists
const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  extractUserFromJwt,
  requireAuthenticatedUser,
};
