const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
const SECRET_KEY = "your_jwt_secret_key"; // Add a strong secret key

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

// Initialize database and create tables if not exists
async function initDb() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      priority TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastname TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      cellphone TEXT NOT NULL
    );
  `);
}

initDb();

// Routes for tasks
app.get('/tasks', async (req, res) => {
  try {
    const db = await dbPromise;
    const tasks = await db.all('SELECT * FROM tasks');
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/tasks', async (req, res) => {
  const { description, priority } = req.body;
  if (!description || !priority) {
    return res.status(400).send('Description and priority are required');
  }
  try {
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO tasks (description, priority) VALUES (?, ?)',
      [description, priority]
    );
    const newTask = { id: result.lastID, description, priority };
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// DELETE route to delete a task by id
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const db = await dbPromise;
    const result = await db.run('DELETE FROM tasks WHERE id = ?', [taskId]);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// User Registration (Signup)
app.post('/users', async (req, res) => {
  const { username, password, name, lastname, cellphone } = req.body;
  if (!username || !password || !name || !lastname || !cellphone) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const db = await dbPromise;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      'INSERT INTO users (username, password, name, lastname, cellphone) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, name, lastname, cellphone]
    );

    res.status(201).json({ success: true, message: 'Registration successful', id: result.lastID });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(400).json({ success: false, message: 'Username already exists' });
    } else {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
});

// User Login
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
