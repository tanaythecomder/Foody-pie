import React from "react";
import { Link, json, useNavigate } from "react-router-dom";
import {useState} from 'react'

export default function Signup() {
  const navigate = useNavigate()
  const [cred, setcred] = useState({name:"", email:"", password:"", geolocation:""})

   const handleSubmit = async (e)=>{
      
        e.preventDefault();
        console.log(JSON.stringify({name:cred.name ,email:cred.email, password:cred.password, location:cred.geolocation}))
        const response = await fetch("https://foody-pie.onrender.com/api/createuser",{ 
          method : 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name:cred.name ,email:cred.email, password:cred.password, location:cred.geolocation})
        })

        const js= await response.json()
        console.log(js)
        if(!js.success){
          alert("Enter valid Credentials")
        }
        else navigate("/login")
        
  }
  const onChange = (event)=>{
    setcred({...cred,[event.target.name]:event.target.value})
  }
  return (
    <>
      <div className="container bg-light">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input type="name" className="form-control" name="name" value = {cred.name} 
            onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name = "email"
              value = {cred.email}
              onChange={onChange}
            />
          
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name = "password"
              value = {cred.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Location
            </label>
            <input
              type="location"
              className="form-control"
              name = "geolocation"
              value = {cred.geolocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <Link to="/login" className = 'm-3 btn btn-danger'>Have an ACCOUNT?</Link>
        </form>
      </div>
    </>
  );
}
