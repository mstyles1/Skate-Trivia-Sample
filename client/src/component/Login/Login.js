import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ user, setUser }) {
    const location = useLocation();
    const navigate = useNavigate();
    const successMessage = location.state?.successMessage || ""; // Get success message if it exists

    const [formData, setFormData] = useState({
        user_email: "",
        user_password: ""
    });

    const [error, setError] = useState("");

    // Clear success message when component is mounted
    useEffect(() => {
        if (successMessage) {
            // Delay the clearing of the success message to ensure it's shown once
            setTimeout(() => {
                navigate('/', { replace: true }); // Navigate to home or login without message
            }, 3000); // Adjust delay time as needed (e.g., 3 seconds)
        }
    }, [successMessage, navigate]);

    const handleInput = (event) => {
        const { name, value } = event.target;
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
            const response = await axios.post("http://localhost:3002/users/", formData);

            if (response.data.length > 0) {
                const DBuser = response.data[0];
                setUser({ id: DBuser.id, user_email: DBuser.user_email });

                console.log("User logged in:", DBuser);
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
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
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