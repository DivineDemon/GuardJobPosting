const jwt = require("jsonwebtoken");

const SECRET = "guard-recruiting-app" || process.env.SECRET;

const verifyToken = (req, res, next) => {
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

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === 1) {
      next();
    } else {
      res.status(403).json("User not Authorized!");
    }
  });
};

const verifyTokenAndCompany = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isCompany === 1) {
      next();
    } else {
      res.status(403).json("User not Authorized!");
    }
  });
};

const verifyTokenAndGuard = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isGuard === 1) {
      next();
    } else {
      res.status(403).json("User not Authorized!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndCompany,
  verifyTokenAndGuard,
};
