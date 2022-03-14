import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
// import authContext from '../Context/auth/authContext';
function Signup() {
  // const context=useContext(authContext);
  // const{createUser,userstate}=context;
    const navigate=useNavigate();
    const[auth,setAuth]=useState({name:"",email:"",password:""})
    const onChange=(e)=>{
        setAuth({...auth,[e.target.name]:e.target.value});
    }
    const onSubmit=async(e)=>{
    const host='http://localhost:5000/api/';
        e.preventDefault();
        const response = await fetch(`${host}auth/createuser`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
            },
        body:JSON.stringify({name:auth.name,email:auth.email,password:auth.password})
        });
        const json=await response.json();

      if(json.success){
        // localStorage.setItem("authtoken",json.authToken);
        navigate('/login');
      }else{
        alert('invalid credentials!!');
      }
    }
  return (
    <>
    <div className="container mt-3">
        <h1>SignUp Here</h1>
    
        <form className="container my-3" onSubmit={onSubmit}>
  <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required minLength="5"/>
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength="5"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength="5"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}

export default Signup
