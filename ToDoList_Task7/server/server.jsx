const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    db.run(
      `CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error('Error creating table', err.message);
        } else {
          console.log('Connected to the in-memory SQlite database.');
        }
      }
    );
  }
});

// Signup Route
app.post('/users', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.run(query, [username, email, password], function (err) {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(201).json({ success: true, message: 'User registered successfully!' });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
