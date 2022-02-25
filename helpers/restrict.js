import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.SECRET_KEY
    : "areallygoodpassword";

const restrict = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (jwt.verify(token, SECRET_KEY)) {
      next();
    }
  } catch (error) {
    res.status(403).send("Unauthorized");
  }
};

export default restrict