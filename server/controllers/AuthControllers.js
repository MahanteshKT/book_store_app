import User from "./../models/UserModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const Register = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const user = await User.signup(data);
    res.status(200).json({ ...user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
