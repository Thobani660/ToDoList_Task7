const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000; // Ensure the correct port is used

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from React app
  credentials: true, // Allow credentials (e.g., cookies) to be sent
};
app.use(cors(corsOptions)); // Use CORS middleware
app.use(bodyParser.json());
app.options('*', cors(corsOptions)); // Handle preflight requests


// Set up SQLite3 database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        surname TEXT,
        userId TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        cellphone TEXT,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating Users table ' + err.message);
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS Todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        priority TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating Todos table ' + err.message);
        }
      }
    );
  }
});

// Register a new user
app.post('/register', async (req, res) => {
  const { name, surname, userId, email, cellphone, password } = req.body;

  if (!name || !email || !userId || !password) {
    return res.status(400).json({ error: 'Name, email, userId, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO Users (username, surname, userId, email, cellphone, password) VALUES (?, ?, ?, ?, ?, ?)',
      [name, surname, userId, email, cellphone, hashedPassword],
      function (err) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({ message: 'User registered successfully!', id: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Error hashing password' });
  }
});

// Sign In endpoint
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Retrieve user data from the database
  db.get('SELECT * FROM Users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // Compare hashed passwords
    const match = await bcrypt.compare(password, row.password);
    if (!match) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    res.json({ message: 'Sign in successful', user: row });
  });
});

// CRUD operations for Todos
// Get all todos
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM Todos', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { text, priority } = req.body;
  if (!text || !priority) {
    return res.status(400).json({ error: 'Text and priority are required' });
  }

  db.run(
    'INSERT INTO Todos (text, priority) VALUES (?, ?)',
    [text, priority],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, text, priority });
    }
  );
});

// Update an existing todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, priority } = req.body;

  db.run(
    'UPDATE Todos SET text = ?, priority = ? WHERE id = ?',
    [text, priority, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id, text, priority });
    }
  );
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Todos WHERE id = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Todo with ID ${id} deleted` });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
