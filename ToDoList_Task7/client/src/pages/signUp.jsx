import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [password, setPassword] = useState('');
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
        cellphone
      };

      try {
        const response = await axios.post('http://localhost:3001/users', userData, {
          headers: { 'Content-Type': 'application/json' }
        });
        setMessage('User registered successfully! Please log in.');
        setName('');
        setLastname('');
        setUsername('');
        setEmail('');
        setCellphone('');
        setPassword('');
        setErrors({});
      } catch (error) {
        console.error("Error:", error.response?.data || error.message || error);
        setMessage(error.response?.data?.message || 'An error occurred.');
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
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "50px"
    }}>
      <h2 style={{ color: 'white' }}>Welcome to Sign Up</h2>
      <p style={{color:"lightgrey"}}>To register on the ToDoList_App <br />you'll need to fill in the form</p>
      <br />
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
