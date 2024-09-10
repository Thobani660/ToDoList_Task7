import React, { useState, useEffect } from "react";
import axios from "axios";
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
      .get("http://localhost:3001/api/todos")
      .then((response) => {
        console.log("Initial Todos:", response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddTodo = () => {
    axios
      .post("http://localhost:3001/api/todos", {
        text: newTodo,
        priority: priority,
      })
      .then((response) => {
        console.log("Added Todo:", response.data);
        const updatedTodos = [...todos, response.data];
        setTodos(updatedTodos);
        setNewTodo("");
        setPriority("low");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTodo = (index) => {
    const todoId = todos[index].id;
    axios
      .delete(`http://localhost:3001/api/todos/${todoId}`)
      .then((response) => {
        console.log("Deleted Todo:", todos[index]);
        setTodos(todos.filter((todo, i) => i !== index));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  const handleEditTodo = (index) => {
    setIsEditing(index);
    setEditedTodo(todos[index].text);
    setEditedPriority(todos[index].priority);
  };
  const handleSaveEdit = (index) => {
    axios
      .put(`http://localhost:3001/api/todos/${index}`, {
        text: editedTodo,
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
  // search
  const filteredTodos = todos.filter((todo) =>
    todo?.text?.toLowerCase().includes(searchTerm.toLowerCase())
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

      <h1 style={{color:"white"}}>Todo List</h1>
      {/* search  component */}
      <SearchInput
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
           <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0
        }}>
          {/* Map over filtered todos  */}

          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              style={{
                listStyle: "none",
                borderRadius: "5px",
                padding: "5px",
                width: "200px",
                marginTop: "10px",
                border: "none",
                
              }}
            >
              {isEditing === index ? (
                <span
                  style={{
                    border: `2px solid ${getPriorityColor(editedPriority)}`,
                    borderRadius: "5px",
                    padding: "5px",
                    width: "200px",
                    marginTop: "10px",
                    backgroundColor: `${getPriorityColor(editedPriority)}`
                    
                  }}
                >
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                    style={{
                      borderRadius: "5px",
                      padding: "5px",
                      width: "200px",
                      marginTop: "10px",
                      border: "none",
                      // backgroundColor: `${getPriorityColor(editedPriority)}`
                    }}
                  />
                </span>
              ) : (
                <div
                  style={{
                    border: `2px solid ${getPriorityColor(todo.priority)}`,
                    borderRadius: "5px",
                    padding: "5px",
                    width: "200px",
                    color:"white",
                    height: "20px",
                    marginTop: "5px",
                    backgroundColor: `${getPriorityColor(editedPriority)}`

                  }}
                >
                  {todo.text}
                </div>
              )}

              {/* priorities */}
              {isEditing === index ? (
                <select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                  style={{
                    padding: "3px",
                    border: `2px solid ${getPriorityColor(editedPriority)}`,
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <span
                  style={{
                    color: "white",
                    border: "2px solid",
                    borderRadius: "5px",
                    padding: "2px",
                    width: "200px",
                    marginTop: "10px",
                    backgroundColor: `${getPriorityColor(editedPriority)}`

                  }}
                >
                   {todo.priority}
                </span>
              )}
              {/* buttons */}
              {isEditing === index ? (
                <button
                  onClick={() => handleSaveEdit(index)}
                  style={{
                    border: `2px solid lightgrey`,
                    padding: "2.5px",
                    borderRadius: "5px",
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditTodo(index)}
                  style={{
                    border: `2px solid lightgrey`,
                    padding: "2.5px",
                    borderRadius: "5px",
                  }}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteTodo(index)}
                style={{
                  border: `2px solid lightgrey`,
                  padding: "2.5px",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
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
          
                      
          backgroundColor: `${getPriorityColor(editedPriority)}`
  

        }}
      />
    </div>
  );
}

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
          border:"3px solid purple"
        }}
      />
    </div>
  );
}

function TodoInput({ value, onChange, priority, onPriorityChange, onAdd }) {
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
          border:"3px solid purple",
          marginLeft:"135px"

        }}
      />
      <select value={priority} onChange={onPriorityChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={onAdd}>Add Todo</button>
        <div>
        <Footer></Footer>
        </div>
    </div>
    
  );
}

export default TodoList;
