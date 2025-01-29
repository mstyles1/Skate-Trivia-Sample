import React, { useState}  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Login({user, setUser}) {
    const [formData, setFormData] = useState ({
      user_name: "",
      user_password: ""
    })
  
    const handleInput = (event) => {
      const name = event.target.name
      const value = event.target.value
      setFormData ({...formData, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          const response = await axios.get ("http://localhost:3002/users/",{
          params: {
            user_name: formData.user_name,
            user_password: formData.user_password,
          },})
    
          
          if ( response.data.length > 0 ) {        
            setUser((prevUser) => {
              const DBuser = response.data[0]
              const updatedUser = { ...prevUser, user_id: DBuser.user_id , user_name: DBuser.user_name};
              console.log("Updated user:", updatedUser); 
              return updatedUser;
            });
          }
        }
        catch (error) {
          console.log (error)
        }
      }

    return (
        <div className= 'd-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
            <h2>Login</h2>
            <form action="login" onSubmit={handleSubmit}>
                <div classname="mb-3">
                    <label htmlFor= "email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                </div>
                <div classname="mb-3">
                    <label htmlFor= "password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name= 'password'
                    onChange={handleInput} className='form-control rounded-0'></input>
                </div>
                <button type='submit' className='btn btn-success w-100'>Login</button>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
            </form>
            </div>
        </div>
    )
}