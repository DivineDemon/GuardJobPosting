import jwt from "jsonwebtoken";

const SECRET = "guard-recruiting-app" || process.env.SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) res.status(403).json("Invalid Token!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("User not Authorized!");
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("User not Authorized!");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === 0) {
      next();
    } else {
      res.status(403).json("User not Authorized!");
    }
  });
};
