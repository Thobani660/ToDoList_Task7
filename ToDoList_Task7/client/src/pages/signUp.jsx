import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const userData = {
      username,
      password,
      name,
      lastname,
      email,  // Ensure email is sent to the backend
      cellphone,
    };

    try {
      const response = await axios.post('http://localhost:3001/register', userData);
      console.log(response.data);
      setMessage('User registered successfully!');
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setMessage(`Error: ${error.response.data.message || "Registration failed."}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request data:", error.request);
        setMessage("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="sign-up" style={{
      width: 400,
      height: 620,
      padding: 20,
      border: '2px solid #7A288A',
      borderRadius: 10,
      boxShadow: '0 0 10px rgba(122, 40, 138, 0.5)',
      backgroundColor: 'black',
      marginLeft: "480px"
    }}>
      <h2 style={{ color: 'white' }}>Sign Up</h2>
      <div style={{
        padding: 20,
        border: '2px solid #7A288A',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(122, 40, 138, 0.5)',
        backgroundColor: 'white'
      }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            placeholder="Name"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          <br />
          <input
            type="text"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            name="lastname"
            placeholder="Lastname"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          <br />
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            placeholder="Username"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          <br />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            placeholder="Email"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          <br />
          <input
            type="tel"
            value={cellphone}
            onChange={(event) => setCellphone(event.target.value)}
            name="cellphone"
            placeholder="Cellphone Number"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            placeholder="Password"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            name="confirmPassword"
            placeholder="Confirm Password"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          <br />
          <input
            type="submit"
            value="Sign Up"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
        </form>
        {message && <p style={{ color: 'white', marginTop: 10 }}>{message}</p>}
      </div>
    </div>
  );
}

export default SignUp;
