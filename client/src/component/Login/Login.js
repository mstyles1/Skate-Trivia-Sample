import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Login({ user, setUser }) {
    const [formData, setFormData] = useState({
        user_email: "",
        user_password: ""
    });

    const [error, setError] = useState(""); 

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

       
        if (!formData.user_email || !formData.user_password) {
            setError("Both fields are required.");
            return; 
        }
        setError("");

        try {
            const response = await axios.get("http://localhost:3002/users/", {
                params: {
                    user_email: formData.user_email,
                    user_password: formData.user_password,
                },
            });

            if (response.data.length > 0) {
                setUser((prevUser) => {
                    const DBuser = response.data[0];
                    const updatedUser = { ...prevUser, id: DBuser.id, user_email: DBuser.user_email };
                    console.log("Updated user:", updatedUser);
                    return updatedUser;
                });
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.log(error);
            setError("Something went wrong, please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form action="login" onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="mb-3">
                        <label htmlFor="user_email"><strong>Email</strong></label>
                        <input
                            type="email" 
                            placeholder="Enter Your Email"
                            name="user_email"
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user_password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="user_password"
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Login</button>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}