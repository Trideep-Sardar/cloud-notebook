import authContext from "./authContext";
import React, { useState } from 'react'

const AuthState = (props) => {
    const[user,setUsers]=useState([]);
    const[token,setToken]=useState();
    const[userstate,setUserstate]=useState();
    const host='http://localhost:5000/api/';

    const getUser=async()=>{
        const response = await fetch(`${host}auth/getusers`, {
            method: 'POST',
            headers: {
              "auth-token":localStorage.getItem('authtoken')
            }
          });
          const json=await response.json();
          console.log(json);
          setUsers(json);
    }

    const createUser=async(name,email,password)=>{
        const response = await fetch(`${host}auth/createuser`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
              },
          body:JSON.stringify({name,email,password})
            
          });
          const json=await response.json();
          const success=await json.success;
          setUserstate(success);
          // setToken(json.userToken);
          console.log(json);
    }

    const authenticateUser=async(email,password)=>{
        const response = await fetch(`${host}auth/userlogin`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
          body:JSON.stringify({email,password})
            
          });
          const json=await response.json();
          console.log(json);
          const success=json.success;
          const usertoken=json.userToken;
          setUserstate(success);
          setToken(usertoken);
    }
  return (
    <authContext.Provider value={{token,userstate,getUser,user,authenticateUser,createUser}}>
            {props.children}
    </authContext.Provider>
  )
}

export default AuthState
