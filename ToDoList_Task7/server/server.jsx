const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt'); // Don't forget to install bcrypt
const jwt = require('jsonwebtoken'); // Don't forget to install jsonwebtoken

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  // Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      lastname TEXT,
      email TEXT UNIQUE,
      cellphone TEXT
    )
  `);

  // Todos Table
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      priority TEXT,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // Register Table
  db.run(`CREATE TABLE IF NOT EXISTS register (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    lastname TEXT,
    username TEXT,
    password TEXT,
    cellphone TEXT
  )`);
});

// User Registration
app.post("/register", (req, res) => {
  const { username, password, name, lastname, email, cellphone } = req.body;

  if (!username || !password || !name || !lastname || !email || !cellphone) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password." });
    }

    const query = `
      INSERT INTO users (username, password, name, lastname, email, cellphone)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [username, hashedPassword, name, lastname, email, cellphone],
      (err) => {
        if (err) {
          return res.status(400).json({ message: "User already exists or invalid data." });
        }
        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  });
});

// User Sign In
app.post("/api/signin", (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ?`;
  db.get(query, [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error checking user." });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error checking password." });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password." });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, "your_secret_key", {
        expiresIn: "1h",
      });
      res.json({ message: "Sign in successful!", token });
    });
  });
});

// CRUD Operations for Todos
// Get all todos
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      tasks: rows,
    });
  });
});

// Add a new todo
app.post('/tasks', (req, res) => {
  const { description, priority } = req.body;
  const sql = 'INSERT INTO todos (description, priority, user_id) VALUES (?, ?, 1)'; // Assuming user_id is 1 for now
  const params = [description, priority];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      description,
      priority,
    });
  });
});

// Update a todo
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { description, priority } = req.body;
  db.run(
    'UPDATE todos SET description = ?, priority = ? WHERE id = ?',
    [description, priority, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updatedID: id });
    }
  );
});

// Delete a todo
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todos WHERE id = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
