import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name,
      surname,
      userId,
      email,
      cellphone
    };
    axios.post('http://localhost:3001/users', userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="sign-up" style={{
      width: 400,
      height: 500,
      padding: 20,
      border: '2px solid #7A288A',
      borderRadius: 10,
      boxShadow: '0 0 10px rgba(122, 40, 138, 0.5)',
      backgroundColor: 'black',
      marginLeft:"480px"
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
          <input type="submit" value="Sign Up" style={{ borderRadius: 5, marginTop: 10, marginBottom: 10, padding: 10, border: '2px solid #7A288A' }} />
        </form>
      </div>
    </div>
  );
}

export default SignUp;