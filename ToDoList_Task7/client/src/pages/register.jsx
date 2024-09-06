import React, { useState } from "react";

function Register() {
  const [userName, setUserName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignUp();
  };
  const handleSignUp = (event) => {
    // event.preventDefault();
    const userData = {
      userName,
      surname,
      email,
      id,
      password,
      confirmPassword,
    };
    insertTextIntoDatabase(userData);
    localStorage.setItem("todoList", JSON.stringify(userData));
  };

  const handleLogin = () => {
    const loginData = {
      userName: document.querySelector("#login-username").value,
      password: document.querySelector("#login-password").value,
    };
    localStorage.setItem("loginInfo", JSON.stringify(loginData));
  };

  const db = new sqlite3.Database("../componenets/database.db");
  const insertTextIntoDatabase = (userData) => {
    db.run(
      `INSERT INTO users (userName,surname,email,id,password,confirmPassword) VALUES (?,?,?,?,?,?)`,
      userData.userName,
      userData.surname,
      userData.email,
      userData.id,
      userData.password,
      userData.confirmPassword,

      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Data inserted");
        }
      }
    );
  };

  return (
    <section
    style={{
      textAlign: "center",
      position: "relative",
      color: "white",
      backgroundSize: "cover",
      marginTop: "100px",
    }}
  >
    <div style={{ display: "flex" }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: "1400px",
            height: "auto", // Set height to auto to accommodate the entire registration form
            marginLeft: "15px",
            padding: "10px",
            marginTop: "100px",
          }}
          >
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  width: "600px",
                  height: "480px",
                  backgroundColor: "rgba(245, 140, 245, 0.39)",
                  marginLeft: "350px",
                  borderRadius: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: "100px",
                  position:"absolute"
                }}
              >
                <h2>Signup</h2>
                <input
                  type="text"
                  placeholder="UserName"
                  style={{
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "2px solid gray",
                    height: "30px",
                    marginTop: "20px",
                  }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name=""
                  placeholder="Surname"
                  id=""
                  style={{
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "2px solid gray",
                    height: "30px",
                    marginTop: "30px",
                  }}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Email"
                  style={{
                    borderRadius: "10px",
                    border: "2px solid gray",
                    textAlign: "center",
                    height: "30px",
                    marginTop: "10px",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  name=""
                  placeholder="Id"
                  id=""
                  style={{
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "2px solid gray",
                    height: "30px",
                    marginTop: "30px",
                  }}
                  value={id}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  id=""
                  style={{
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "2px solid gray",
                    height: "30px",
                    marginTop: "30px",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  name=""
                  placeholder="ConformPassword"
                  id=""
                  style={{
                    borderRadius: "10px",
                    textAlign: "center",
                    border: "2px solid gray",
                    height: "30px",
                    marginTop: "30px",
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />
                <br />
                <button
                  class="w3-button w3-white w3-border w3-border-red w3-round-large"
                  type="submit"
                  onClick={handleSignUp}
                >
                  SignUp
                </button>
              </div>
            </form>

            <div
              style={{
                width: "300px",
                height: "400px",
                backgroundColor: "gray",
              }}
            >
              <input
                type="text"
                placeholder="UserName"
                style={{
                  borderRadius: "10px",
                  border: "2px solid gray",
                  height: "40px",
                  marginTop: "100px",
                }}
              />
              <br></br>
              <input
                type="password"
                name=""
                placeholder="Password"
                id=""
                style={{
                  borderRadius: "10px",
                  border: "2px solid gray",
                  height: "40px",
                  marginTop: "30px",
                }}
              />
              <br />
              <br></br>
              <button
                style={{
                  borderRadius: "10px",
                  padding: "5px",
                  width: "90px",
                  marginRight: "5px",
                }}
              >
                login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Register;
