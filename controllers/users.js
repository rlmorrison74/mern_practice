import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { Db } from "mongodb";

const SALT_ROUNDS =
  process.env.NODE_ENV === "production" ? process.env.SALT_ROUNDS : 11;

const SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.SECRET_KEY
    : "areallygoodpassword";

const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
      email,
      password_digest,
    });

    if (await user.save()) {
      const payload = {
        id: user._id,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
      };
      const token = jwt.sign(payload, SECRET_KEY);

      res.status(201).json({ token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select(
      "email password_digest"
    );

    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
      };

      const token = jwt.sign(payload, SECRET_KEY);

      res.status(200).json({ token });
    } else {
      res.status(401).send("Login credentials invalid");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, SECRET_KEY);

    if (payload) {
      res.json(payload);
    }
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
