import jwt from "jsonwebtoken";

export const signToken = (user) => {
  return jwt.sign(
    {
      user,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).json({ message: "token is not valid" });
      } else {
        req.user = decode.user._id;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "token not supplied" });
  }
};
