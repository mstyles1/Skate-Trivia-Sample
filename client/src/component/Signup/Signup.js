import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation.js';
import axios from 'axios';

export function Signup() {
  const [values, setValues] =useState({
    user_name:'',
    user_email:'',
    user_password: '',

})
const navigate = useNavigate();
const [errors, setErrors] = useState({})
const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.user_name]: [event.target.value]}))
}

const handleSubmit = (event) => {      
  event.preventDefault();        
  const err = Validation(values);  
  setErrors(err);         
  if(err.user_name === "" && err.user_email === "" && err.user_password === "") 
    {            
      axios.post('http://localhost:3002/users', values)            
      .then(res => {                
        navigate('/');            
      })            
      .catch(err => console.log(err));        
    }    
  }
  
return (
    <div className= 'd-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>Signup</h2>
        <form action="signup" onSubmit={handleSubmit}>
            <div classname="mb-3">
                <label htmlFor= "name"><strong>Name</strong></label>
                <input type="name" placeholder='Enter Name' name="name"
                onChange={handleInput} className='form-control rounded-0'></input>
                {errors.user_name && <span className= 'text-danger'>{errors.user_name}</span>}
            </div>
            <div classname="mb-3">
                <label htmlFor= "email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name="email"
                onChange={handleInput} className='form-control rounded-0'></input>
                {errors.user_email && <span className= 'text-danger'>{errors.user_email}</span>}
            </div>
            <div classname="mb-3">
                <label htmlFor= "password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name="password" 
                onChange={handleInput} className='form-control rounded-0'></input>
                {errors.user_password && <span className= 'text-danger'>{errors.user_password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Create Account</button>
            <p>By clicking the button, you agree to our terms and conditions.</p>
            <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
        </div>
    </div>
    )}

    export default Signup;
