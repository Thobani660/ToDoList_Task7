import React, { useState } from "react";
import axios from "axios";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const user = {
      username: userName,
      surname: surname,
      email: email,
      password: password,
    };
  
    Object.entries(user).forEach(([key, value]) => {
      if (!value) {
        setText("Please fill in all the fields.");
        return;
      }
    });
  
    if (password !== confirmPassword) {
      setText("Passwords do not match.");
      return;
    }
  
    axios.post('http://localhost:3000/register', user)
      .then(response => {
        console.log(response.data);
        setText("Registration successful!");
      })
      .catch(error => {
        console.error(error);
        setText("Registration failed. Please try again.");
      });
  };
  

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "gray",
        marginTop:"-150px"
      }}
    >
      <div
        style={{
          width: "300px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        <form>
          <input
            type="text"
            placeholder="UserName"
            style={{
              borderRadius: "10px",
              border: "2px solid gray",
              height: "40px",
              marginBottom: "20px",
            }}
          />
          <br />
          <input
            type="password"
            name=""
            placeholder="Password"
            id=""
            style={{
              borderRadius: "10px",
              border: "2px solid gray",
              height: "40px",
              marginBottom: "20px",
            }}
          />
          <br />
          <button
            style={{
              borderRadius: "10px",
              padding: "5px",
              width: "90px",
              marginRight: "5px",
            }}
            onClick={handleSubmit}
          >
            login
          </button>
        </form>
        <p style={{ textAlign: "center" }}>{text}</p>
      </div>
    </section>
  );
}

export default SignIn;