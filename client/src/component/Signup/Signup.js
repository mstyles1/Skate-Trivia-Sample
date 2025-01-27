import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Validation from './SignupValidation.js';

export function Signup() {
  const [values, setValues] =useState({
    name:'',
    email:'',
    password: '',

})
const [errors, setErrors] = useState({})
const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
}
const handleSubmit =(event => {
    event.preventDefault();
    setErrors(Validation(values ))  
})
  return (
    <div className= 'd-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>Signup</h2>
        <form action="signup" onSubmit={handleSubmit}>
            <div classname="mb-3">
                <label htmlFor= "name"><strong>Name</strong></label>
                <input type="name" placeholder='Enter Name' name="name"
                onChange={handleInput} className='form-control rounded-0'></input>
                {errors.name && <span className= 'text-danger'>{errors.name}</span>}
            </div>
            <div classname="mb-3">
                <label htmlFor= "email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name="email"
                onChange={handleInput} className='form-control rounded-0'></input>
                {errors.email && <span className= 'text-danger'>{errors.email}</span>}
            </div>
            <div classname="mb-3">
                <label htmlFor= "password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name="password" 
                onChange={handleInput} className='form-control rounded-0'></input>
                {errors.password && <span className= 'text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Create Account</button>
            <p>By clicking the button, you agree to our terms and conditions.</p>
            <Link to="/" button type='submit' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
        </div>
    </div>
    )}

    export default Signup;
