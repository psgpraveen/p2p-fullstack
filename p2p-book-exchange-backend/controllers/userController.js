const User = require('../models/User');
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, mobileNumber, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered!' });
    }
    const user = await User.create({ name, email, password, mobileNumber, role });
    res.status(201).json({ message: 'User registered successfully!', user });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials!' });
    res.status(200).json({ message: 'Login successful!', role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
