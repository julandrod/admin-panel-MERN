import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptedPassword(password),
    });

    const user = await newUser.save();
    res.status(200).json({ message: "User created", info: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound)
      return res.status(400).json({ message: "Invalid email or password" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );
    if (!matchPassword)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: userFound._id,
        username: userFound.username,
        isAdmin: userFound.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...info } = userFound._doc;

    res.status(200).json({ message: "Token created", info, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
