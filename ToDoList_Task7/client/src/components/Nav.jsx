import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className="w3-bar w3" style={{
      backgroundColor: "rgba(44, 37, 105, 0.603)",
      borderBottom: "1px solid gray",
      padding: "15px",
      justifyContent: "end",
      alignItems: "end",
      marginTop:"-20px",
      marginLeft:"-7px",
      textAlign: "end",
      display: "flex",
      width: "1440px",
      
      zIndex: 1 // Add this to ensure the navigation bar is on top of other elements
    }}>
      <div style={{
        width: "100px",
        height: "100px",
        // backgroundImage: `url(${require("../source/logo.jpg")})`,
        border: "2px solid gray",
        borderRadius: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "160px"
      }}>
      </div>

      <div style={{
        marginBottom: "40px",
        color: "white"
      }}>
        <Link to="/" className="w3-bar-item w3-button" style={{
          marginLeft: "780px",
          backgroundColor: "#7DF9FF",
          borderBottom: "2px solid gray",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          padding: "15px"
        }}>Home</Link>
        <Link to="/TodoList" className="w3-bar-item w3-button" style={{
          marginLeft: "10px",
          backgroundColor: "#7DF9FF",
          borderBottom: "2px solid gray",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          padding: "15px"
        }}>Todolist</Link>
        <Link to="/signIn" className="w3-bar-item w3-button" style={{
          marginLeft: "10px",
          backgroundColor: "#7DF9FF",
          borderBottom: "2px solid gray",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          padding: "15px"
        }}>Sign_In</Link>
        <Link to="/SignUp" className="w3-bar-item w3-button" style={{
          marginLeft: "10px",
          backgroundColor: "#7DF9FF",
          borderBottom: "2px solid gray",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          marginRight:"30px",
          padding: "15px"
        }}>SignUp</Link>
      </div>
    </div>
  );
}