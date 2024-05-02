import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const Navigate = useNavigate()
  const [cred, setcred] = useState({email:"", password:""})

   const handleSubmit = async (e)=>{
        console.log("123")
        e.preventDefault();
        // console.log(JSON.stringify({name:cred.name ,email:cred.email, password:cred.password, location:cred.geolocation}))
        const response = await fetch("https://foody-pie.onrender.com/api/loginuser",{ 
          method : 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({email:cred.email, password:cred.password})
        })

        const json= await response.json()

        console.log(json)
       
        if(!json.success){
          alert("Enter valid Credentials")
        }
        else{

          localStorage.setItem("authToken", json.authToken)
          localStorage.setItem("userEmail",cred.email )
          console.log(localStorage.getItem("authToken"))
          Navigate("/")
        } 
        
  }
  const onChange = (event)=>{
    setcred({...cred,[event.target.name]:event.target.value})
  }
  return (
    
      <>
      <div className="container bg-light">
        <form onSubmit={handleSubmit}>

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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <Link to="/signup" className = 'm-3 btn btn-danger'>Don't have an account</Link>
        </form>
      </div>
    </>
    
  )
}
