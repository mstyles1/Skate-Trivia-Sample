import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Signup() {
  const [values, setValues] = useState({
    user_email: '',
    user_password: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const Validation = (values) => {
    let errors = {};

    if (!values.user_email) {
      errors.user_email = "Email is required";
    }
    if (!values.user_password) {
      errors.user_password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setError(err);
    if (err.user_email === "" && err.user_password === "") {
      axios.post('http://localhost:3002/users', values)
        .then(res => {
          console.log("Server Response", res);
          navigate('/');
        })
        .catch(err => {
          console.error("error response:", err);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Signup</h2>
        <form action="signup" onSubmit={handleSubmit}>
          {error && error.user_email && <div className="alert alert-danger">{error.user_email}</div>}
          {error && error.user_password && <div className="alert alert-danger">{error.user_password}</div>}
          <div className="mb-3">
            <label htmlFor="user_email"><strong>Email</strong></label>
            <input
              type="email"
              id="user_email" 
              placeholder="Enter Your Email"
              name="user_email"
              value={values.user_email} 
              onChange={handleInput}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user_password"><strong>Password</strong></label>
            <input
              type="password"
              id="user_password" 
              placeholder="Enter Password"
              name="user_password"
              value={values.user_password} 
              onChange={handleInput}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Create Account</button>
          <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Log in
          </Link>
        </form>
      </div>
    </div>
  );
}
