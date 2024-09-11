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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!lastname) errors.lastname = 'Lastname is required';
    if (!email) errors.email = 'Email is required';
    if (!cellphone) errors.cellphone = 'Cellphone number is required';
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validate()) {
      setIsLoading(true);
      setMessage('');
  
      const userData = {
        username,
        password,
        name,
        lastname,
        email,
        cellphone,
      };
  
      console.log("User Data to be sent:", userData);  // Add this log to inspect data
  
      try {
        const response = await axios.post('http://localhost:3001/register', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
        setMessage('User registered successfully! Please log in.');
        // Clear form fields
        setName('');
        setLastname('');
        setUsername('');
        setEmail('');
        setCellphone('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          setMessage(`Error: ${error.response.data.message || "Registration failed."}`);
        } else if (error.request) {
          setMessage("No response from server. Please try again.");
        } else {
          setMessage("An error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
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
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          <br />
          <input
            type="text"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            name="lastname"
            placeholder="Lastname"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          {errors.lastname && <span style={{ color: "red" }}>{errors.lastname}</span>}
          <br />
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            placeholder="Username"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
          <br />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            placeholder="Email"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          <br />
          <input
            type="tel"
            value={cellphone}
            onChange={(event) => setCellphone(event.target.value)}
            name="cellphone"
            placeholder="Cellphone Number"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          {errors.cellphone && <span style={{ color: "red" }}>{errors.cellphone}</span>}
          <br />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            placeholder="Password"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            name="confirmPassword"
            placeholder="Confirm Password"
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }}
          />
          {errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword}</span>}
          <br />
          <input
            type="submit"
            value={isLoading ? 'Registering...' : 'Sign Up'}
            disabled={isLoading}
            style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A', backgroundColor: isLoading ? '#ccc' : '#28a745', color: '#fff' }}
          />
        </form>
        {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red', marginTop: 10 }}>{message}</p>}
      </div>
    </div>
  );
}

export default SignUp;
