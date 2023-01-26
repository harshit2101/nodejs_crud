const asyncWrapper = require("../middleware/async");
const User = require("../models/User");

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

const getUser = asyncWrapper(async (req, res) => {
  // const user = await User.findById(req.params.id);
  // if (!user) {
  //   res.status(404).json({msg:"User not found"});
  // return
  // }
  // res.json({user});

  // const {id:userID}=req.params
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(404).json({ msg: `No user with this id` });
  }
  res.status(200).json({ user });
});

const createUser = asyncWrapper(async (req, res) => {
  // res.send('Create User')
  // res.json(req.body)

  const user = await User.create(req.body);
  res.status(201).json({ user });
});

const updateUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ msg: `No user with this id` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOneAndDelete({ _id: userID });
    if (!user) {
      return res.status(404).json({ msg: `No user with this id` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
};
