import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
// import authContext from '../Context/auth/authContext';
function Login() {
  // const context=useContext(authContext);
  // const{authenticateUser,token,userstate}=context;
    const navigate=useNavigate()
    const[auth,setAuth]=useState({email:"",password:""})
    const onChange=(e)=>{
        setAuth({...auth,[e.target.name]:e.target.value});
    }
    const onSubmit=async(e)=>{
        const host='http://localhost:5000/api/';
        e.preventDefault();
        const response = await fetch(`${host}auth/userlogin`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
        body:JSON.stringify({email:auth.email,password:auth.password})
          
        });
        const json=await response.json();
        if(json.success){
          localStorage.setItem("authtoken",json.userToken);
          navigate('/notes');
        }else{
          alert('invalid credentials!!');
        }
    }

  return (
    <>
    <div className="container mt-3">
        <h1 className='text-center'>Login Here</h1>
   
        <form className='container' onSubmit={onSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={auth.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={auth.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
 </div>
    </>
  )
}

export default Login
