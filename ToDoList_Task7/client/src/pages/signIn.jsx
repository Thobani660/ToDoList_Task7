import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/signin', { username, password });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      setMessage("Sign in successful!");
      navigate('/tasks'); // Redirect to tasks or another protected route
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Sign in failed. Please try again.");
    }
  };

  return (
    <section style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      marginTop:"-150px"
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
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
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
            placeholder="Password"
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
          <Link to="/signUp">
            <h5 style={{ color: "purple" }}>Forgot your password?</h5>
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
            Login
          </button>
        </form>
        <p>{message}</p>
      </div>
    </section>
  );
}

export default SignIn;
