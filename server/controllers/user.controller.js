import User from "../mongodb/models/user.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).limit(req.query._end);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json({ user: userExists });

    const newUser = await User.create({ name, email, avatar });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    let user;
    if (String(id).includes("@")) {
      user = await User.findOne({ email: String(id) }).populate(
        "allProperties"
      );
    } else {
      user = await User.findById(id).populate("allProperties");
    }
    if (!user) {
      res.status(404).json(`No user found with email ${id}`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllUsers, createUser, getUserInfoByID };
