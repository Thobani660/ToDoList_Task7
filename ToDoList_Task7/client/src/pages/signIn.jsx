import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users/signin', { username, password });
      console.log("Response from server:", response.data);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);  // Store JWT token
        setMessage('Login successful!');
        onLogin(true);  // Update parent component's login state
        navigate('/tasks');  // Navigate to the tasks or another protected route
      } else {
        setMessage(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(error.response?.data?.message || 'Sign in failed. Please try again.');
    }
  };

  return (
    <section style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      marginTop: "-150px"
    }}>
      <div style={{
        width: "300px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              borderRadius: "10px",
              border: "2px solid purple",
              height: "40px",
              marginBottom: "20px",
              width: "250px",
              textAlign: "center"
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
           
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderRadius: "10px",
              border: "2px solid purple",
              height: "40px",
              marginBottom: "20px",
              width: "250px",
              textAlign: "center"
            }}
          />
          <br />
          <h4>or</h4>
          <Link to="/registration">
            <h5 style={{ color: "purple" }}>Don't have an account? Sign Up</h5>
          </Link>
          <button
            type="submit"
            style={{
              borderRadius: "10px",
              padding: "5px",
              width: "200px",
              marginRight: "5px",
              border: "2px solid purple",
              textAlign: "center"
            }}
          >
            Submit
          </button>
        </form>
        <p>{message}</p>
      </div>
    </section>
  );
}

export default Login;
