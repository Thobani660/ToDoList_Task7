// server.jsx

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables if they don't exist
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT,
  priority TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  name TEXT,
  lastname TEXT,
  cellphone TEXT
)`);

// Middleware to check for authentication token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes for managing tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ tasks: rows });
  });
});

app.post('/tasks', authenticateToken, (req, res) => {
  const { description, priority } = req.body;
  console.log('Received task data:', { description, priority });
  const sql = 'INSERT INTO tasks (description, priority) VALUES (?, ?)';
  const params = [description, priority];
  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error inserting task:', err.message);
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


app.put('/tasks/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { description, priority } = req.body;
  db.run(
    'UPDATE tasks SET description = ?, priority = ? WHERE id = ?',
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

app.delete('/tasks/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

// Routes for user authentication
app.post('/register', (req, res) => {
  const { username, password, name, lastname, cellphone } = req.body;
  if (!username || !password || !name || !lastname || !cellphone) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(`INSERT INTO users (username, password, name, lastname, cellphone) VALUES (?, ?, ?, ?, ?)`,
    [username, hashedPassword, name, lastname, cellphone],
    function (err) {
      if (err) {
        return res.status(400).json({ success: false, message: 'Failed to register user.' });
      }
      res.json({ success: true, message: 'Registration successful' });
    }
  );
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Please provide username and password' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, message: 'Sign in successful', token });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
