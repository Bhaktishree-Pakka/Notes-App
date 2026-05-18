const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
   if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
});

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
if (!email || !password) {
  return res.status(400).json({ message: "Email and password required" });
}
  const user = await User.findOne({ email });

if (!user) {
 return res.status(404).json({ message: "User not found" });}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
   return res.status(401).json({ message: "Wrong password" });
}

const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};

module.exports = { registerUser, loginUser };