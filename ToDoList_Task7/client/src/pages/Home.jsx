import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
  <section style={{position:"relative",backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
    <img></img>
    <div style={{position:"absolute" }}>
      <div style={{width:"1400px",height:'440px',marginLeft:"15px",padding:"10px",display:"flex",marginTop:"10px"}}>
              <div style={{width:"400px",height:"450px",border:"1px solid gray",color:"white",marginTop:"0px",backgroundColor:" rgba(44, 37, 105, 0.603)",padding:"15px",borderRadius:"10px"}}>
                <h2 style={{textAlign:"center"}}>This is a TodoList Application,
                  <br /> A user should login / Register
                  <br /> to use the App. 
                </h2>
                <h4>General Requirements
                    Implement CRUD (Create, Read, Update, Delete) operations for to-do list items.
                    Use SQLite to store user information and to-do list items.
                    Ensure the application is responsive and user-friendly.
                    Use proper validation for input fields to prevent errors.
                    Implement user authentication and authorization to protect user data.</h4>
                    <br /><br />
                      <Link >
                      <button  style={{borderRadius:"10px",padding:"5px",width:"90px",marginLeft:"80px"}}>login</button>

                      </Link>
                      <Link to="signUp">
                    <button style={{borderRadius:"10px",padding:"5px",width:"90px"}}>register</button>
                    </Link>
                </div>
                <div style={{width:"900px",opacity:"0.5",backgroundImage:`url(${require("../source/logo.jpg")})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"500px",backgroundColor:"pink",marginLeft:"50px",marginTop:"-10px",borderRadius:"10px",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
               <h1>To Do List Ui</h1>

                </div>

             
      </div>
    </div>
  </section>
  )
}
