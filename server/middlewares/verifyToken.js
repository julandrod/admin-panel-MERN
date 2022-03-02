import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Token is not valid", error: err });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "You are not allowed to do that!" });
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "You are not allowed to do that!" });
    }
  });
};
