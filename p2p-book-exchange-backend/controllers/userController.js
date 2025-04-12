const fs = require('fs');
const path = require('path');

// Load user data from JSON file
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

exports.registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = { id: Date.now().toString(), name, email, password, role };
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users));
  res.status(201).json({ message: 'User registered successfully!', user: newUser });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful!', role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials!' });
  }
};
