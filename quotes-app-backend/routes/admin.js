const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const adminData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/admin.json')));
const SECRET = "mysecret";

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminData.username && password === adminData.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
