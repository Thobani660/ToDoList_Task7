
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = { email, password };

    if (!email || !password) {
      setMessage("Please fill in all the fields.");
      return;
    }

    axios.post('http://localhost:3000/register', user)
      .then(response => {
        console.log(response.data);
        setMessage("Sign in successful!");
      })
      .catch(error => {
        console.error(error);
        setMessage(error.response?.data?.error || "Sign in failed. Please try again.");
      });
  };

  return (
    <section style={ {  display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "gray",
        marginTop:"-150px"}}>
      <div style={{width: "300px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            alignItems:"center",
            justifyContent:"center",
            textAlign:"center"}}>
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{  borderRadius: "10px",
                border: "2px solid purple",
                height: "40px",
                marginBottom: "20px",
                width:"250px",
                textAlign:"center" }}
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
                width:"250px",
                textAlign:"center"}}
          />
          <br />
          <h4>or</h4>
          <Link to="signUp">
            <h5 style={{color:"purple"}}>forgot your password?</h5>
          </Link>
          <button
            type="submit"
            style={{   borderRadius: "10px",
                padding: "5px",
                width: "200px",
                marginRight: "5px",
                border: "2px solid purple",
                textAlign:"center"}}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: "center" }}>{message}</p>
      </div>
    </section>
  );
}

export default SignIn;
