import React, { useState, useEffect } from "react";
// import axios from "axios";
import Footer from "../components/Footer";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("low");
  const [isEditing, setIsEditing] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");
  const [editedPriority, setEditedPriority] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        console.log("Initial Todos:", response.data.tasks);
        setTodos(response.data.tasks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditTodo = (index) => {
    setIsEditing(index);
    setEditedTodo(todos[index].description);
    setEditedPriority(todos[index].priority);
  };
  
  const handleAddTodo = () => {
    axios
      .post("http://localhost:3001/tasks", {
        description: newTodo,
        priority: priority,
      })
      .then((response) => {
        console.log("Added Todo:", response.data);
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setNewTodo("");
        setPriority("low");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  const handleDeleteTodo = (index) => {
    const todoId = todos[index].id;
    axios
      .delete(`http://localhost:3001/tasks/${todoId}`)
      .then((response) => {
        console.log("Deleted Todo:", todos[index]);
        setTodos(todos.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveEdit = (index) => {
    const todoId = todos[index].id;
    axios
      .put(`http://localhost:3001/tasks/${todoId}`, {
        description: editedTodo,
        priority: editedPriority,
      })
      .then((response) => {
        console.log("Updated Todo:", response.data);
        const updatedTodos = [...todos];
        updatedTodos[index] = response.data;
        setTodos(updatedTodos);
        setIsEditing(null);
        setEditedTodo("");
        setEditedPriority("low");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "orange";
      case "high":
        return "red";
      default:
        return "black";
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      marginTop: "50px",
      marginLeft: "-60px"
    }}>
      <h1 style={{ color: "white" }}>Todo List</h1>
      <SearchInput
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        width: "100%",
        padding: "10px",
        boxSizing: "border-box",
      }}>
        {filteredTodos.length === 0 ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            No todos available
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
            <div
              key={index}
              style={{
                border: `2px solid ${getPriorityColor(todo.priority)}`,
                borderRadius: "5px",
                padding: "10px",
                width: "200px",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: getPriorityColor(todo.priority),
                color: "white",
                boxSizing: "border-box",
              }}
            >
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                    style={{
                      borderRadius: "5px",
                      padding: "5px",
                      width: "100%",
                      marginBottom: "10px",
                      border: "none",
                    }}
                  />
                  <select
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value)}
                    style={{
                      padding: "3px",
                      border: `2px solid ${getPriorityColor(editedPriority)}`,
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <button
                    onClick={() => handleSaveEdit(index)}
                    style={{
                      border: "2px solid lightgrey",
                      padding: "2.5px",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div
                    style={{
                      height: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  >
                    {todo.description}
                  </div>
                  <span
                    style={{
                      border: "2px solid",
                      borderRadius: "5px",
                      padding: "2px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {todo.priority}
                  </span>
                  <button
                    onClick={() => handleEditTodo(index)}
                    style={{
                      border: "2px solid lightgrey",
                      padding: "2.5px",
                      borderRadius: "5px",
                      marginTop: "5px",
                      width: "100%",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(index)}
                    style={{
                      border: "2px solid lightgrey",
                      padding: "2.5px",
                      borderRadius: "5px",
                      marginTop: "5px",
                      width: "100%",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
      <TodoInput
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        priority={priority}
        onPriorityChange={(e) => setPriority(e.target.value)}
        onAdd={handleAddTodo}
        style={{
          border: "2px solid",
          borderRadius: "5px",
          padding: "5px",
          width: "200px",
          marginLeft: "10px",
          backgroundColor: getPriorityColor(priority),
        }}
      />
      <Footer />
    </div>
  );
}

// Search Input Component
function SearchInput({ searchTerm, onChange }) {
  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={onChange}
        placeholder="Search todos"
        style={{
          borderRadius: "5px",
          padding: "8px",
          width: "260px",
          marginTop: "10px",
          border: "3px solid purple",
        }}
      />
    </div>
  );
}

// Todo Input Component
function TodoInput({ value, onChange, priority, onPriorityChange, onAdd, style }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter new todo"
        style={{
          borderRadius: "5px",
          padding: "5px",
          width: "250px",
          marginTop: "10px",
          border: "3px solid purple",
          marginLeft: "135px",
        }}
      />
      <select
        value={priority}
        onChange={onPriorityChange}
        style={{
          padding: "5px",
          marginTop: "10px",
          border: "3px solid purple",
          borderRadius: "5px",
        }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        onClick={onAdd}
        style={{
          border: "2px solid lightgrey",
          padding: "5px",
          borderRadius: "5px",
          marginTop: "10px",
          backgroundColor: "purple",
          color: "white",
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

export default TodoList;
