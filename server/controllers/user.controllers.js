import User from "../models/User.js";

export const updateUserById = async (req, res) => {
  if (req.body.password) {
    req.body.password = await User.encryptedPassword(req.body.password);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: "User updated", info: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating  user", error });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", user });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllUsers = async (req, res) => {
  const latestUsersQuery = req.query.new;
  try {
    const users = latestUsersQuery
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
