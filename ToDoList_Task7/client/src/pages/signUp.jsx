
import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name,
      surname,
      userId,
      email,
      cellphone,
      password
    };
    
    axios.post('http://localhost:3000/register', userData)
    .then((response) => {
      console.log(response.data);
      setMessage('User registered successfully!');
    })
    .catch((error) => {
      console.error(error);
      setMessage('Failed to register user.');
    });
  };

  return (
    <div className="sign-up" style={{
      width: 400,
      height: 580,
      padding: 20,
      border: '2px solid #7A288A',
      borderRadius: 10,
      boxShadow: '0 0 10px rgba(122, 40, 138, 0.5)',
      backgroundColor: 'black',
      marginLeft:"480px"}}>
      <h2 style={{ color: 'white' }}>Sign Up</h2>
      <div style={{       padding: 20,
        border: '2px solid #7A288A',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(122, 40, 138, 0.5)',
        backgroundColor: 'white' }}>
        <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} name="name" placeholder="Name" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }} />
          <br />
          <input type="text" value={surname} onChange={(event) => setSurname(event.target.value)} name="surname" placeholder="Surname" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }} />
          <br />
          <input type="text" value={userId} onChange={(event) => setUserId(event.target.value)} name="name" placeholder="ID" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }} />
          <br />
          <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }} />
          <br />
          <input type="tel" value={cellphone} onChange={(event) => setCellphone(event.target.value)} name="cellphone" placeholder="Cellphone Number" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }} />
          <br />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} name="password" placeholder="Password" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }} />
          <br />
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} name="confirmPassword" placeholder="Confirm Password" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }} />
          <br />
          <input type="submit" value="Sign Up" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A'  }} />
        </form>
        {message && <p style={{ color: 'white' }}>{message}</p>}
      </div>
    </div>
  );
}

export default SignUp;
