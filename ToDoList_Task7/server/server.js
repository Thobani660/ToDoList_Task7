const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database("./todo_list.db", (err) => {
  if (err) {
    console.error("error connecting:", err);
    return;
  }
  console.log("connected to server database");
});

// Creating the todos table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      priority TEXT NOT NULL
    );
  `);
});

app.get("/api/todos", (req, res) => {
  db.all("SELECT * FROM todos", (err, rows) => {
    if (err) {
      console.error("error running query:", err);
      res.status(500).send({ message: "Error fetching todos" });
    } else {
      res.send(rows);
    }
  });
});

app.post("/api/todos", (req, res) => {
  const { text, priority } = req.body;
  db.run(
    "INSERT INTO todos (text, priority) VALUES (?, ?)",
    [text, priority],
    (err) => {
      if (err) {
        console.error("error running query:", err);
        res.status(500).send({ message: "Error adding todo" });
      } else {
        res.send({ message: "Todo added successfully" });
      }
    }
  );
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text, priority } = req.body;
  db.run(
    "UPDATE todos SET text = ?, priority = ? WHERE id = ?",
    [text, priority, id],
    (err) => {
      if (err) {
        console.error("error running query:", err);
        res.status(500).send({ message: "Error updating todo" });
      } else {
        res.send({ message: "Todo updated successfully" });
      }
    }
  );
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("error running query:", err);
      res.status(500).send({ message: "Error deleting todo" });
    } else {
      res.send({ message: "Todo deleted successfully" });
    }
  });
});


const express = require('express');
const mysql = require('mysql');
const axios = require('axios');

const dbs = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Connect to the database
dbs.connect(function(err) {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + dbs.threadId);
});

// Middleware to parse JSON requests
app.use(express.json());

// Create a new user
app.post('/sign-up', (req, res) => {
  const { name, surname, userId, email, cellphone } = req.body;
  const query = `INSERT INTO users (name, surname, userId, email, cellphone) VALUES (?, ?, ?, ?, ?)`;
  dbs.query(query, [name, surname, userId, email, cellphone], (err, results) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error creating user' });
    } else {
      console.log('Form was successfully submitted');
      res.send({ message: 'User created successfully' });
    }
  });
});

// Get all users
app.get('/users', (req, res) => {
  const query = `SELECT * FROM users`;
  dbs.query(query, (err, results) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error retrieving users' });
    } else {
      console.log('Form retrieved');
      res.send(results);
    }
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, surname, userId, email, cellphone } = req.body;
  const query = `UPDATE users SET name = ?, surname = ?, userId = ?, email = ?, cellphone = ? WHERE id = ?`;
  dbs.query(query, [name, surname, userId, email, cellphone, id], (err, results) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error updating user' });
    } else {
      console.log('Form successfully updated');
      res.send({ message: 'User updated successfully' });
    }
  });
});

// Start the server
// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

app.listen(3001, () => {
  console.log("Server listening on port http://localhost:3001");
});

app.listen(3001, () => {
  console.log("Server listening on port http://localhost:3001");
});



// Create the users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    surname TEXT,
    userId TEXT,
    email TEXT,
    cellphone TEXT
  );
`);

// Handle the /users endpoint
app.post('/users', (req, res) => {
  const { name, surname, userId, email, cellphone } = req.body;
  const sql = `
    INSERT INTO users (name, surname, userId, email, cellphone)
    VALUES (?, ?, ?, ?, ?);
  `;
  const params = [name, surname, userId, email, cellphone];
  db.run(sql, params, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating user' });
    } else {
      res.send({ message: 'User created successfully' });
    }
  });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});




// Create a database connection
const dbi = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Use JSON parser middleware
app.use(express.json());

// Create a table if it doesn't exist
dbi.run(`
  CREATE TABLE IF NOT EXISTS login (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    surname TEXT,
    email TEXT,
    password TEXT
  );
`);

// GET all users
app.get('/users', (req, res) => {
  const query = `SELECT * FROM login`;
  dbi.all(query, (err, rows) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching users' });
    } else {
      res.send(rows);
    }
  });
});

// GET a single user by ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM login WHERE id = ?`;
  dbi.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching user' });
    } else if (row) {
      res.send(row);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

// POST a new user
app.post('/register', (req, res) => {
  const { username, surname, email, password } = req.body;
  const query = `INSERT INTO login (username, surname, email, password) VALUES (?, ?, ?, ?)`;
  dbi.run(query, [username, surname, email, password], (err) => {
    if (err) {
      res.status(500).send({ message: 'Error registering user' });
    } else {
      res.send({ message: 'User registered successfully!' });
    }
  });
});

// PUT update a user
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { username, surname, email, password } = req.body;
  const query = `UPDATE login SET username = ?, surname = ?, email = ?, password = ? WHERE id = ?`;
  dbi.run(query, [username, surname, email, password, id], (err) => {
    if (err) {
      res.status(500).send({ message: 'Error updating user' });
    } else {
      res.send({ message: 'User updated successfully!' });
    }
  });
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM login WHERE id = ?`;
  dbi.run(query, [id], (err) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting user' });
    } else {
      res.send({ message: 'User deleted successfully!' });
    }
  });
});

// login request
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM login WHERE username = ? AND password = ?`;
  dbi.get(query, [username, password], (err, row) => {
    if (err) {
      res.status(500).send({ message: 'Error logging in' });
    } else if (row) {
      res.send({ message: 'Login successful!' });
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});