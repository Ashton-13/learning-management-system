import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");

        try {
             await api.post("api/register/", {
                    username,
                    email,
                    password,
                }
            );

            navigate("/login");
        } catch (error) {
            setMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="register-username">Username</label>
                    <input
                        type="text"
                        id="register-username"
                        value={username}
                        required
                        autoComplete="username"
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="register-email">Email</label>
                    <input
                        type="email"
                        id="register-email"
                        value={email}
                        required
                        autoComplete="email"
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="register-password">Password</label>
                    <input
                        type="password"
                        id="register-password"
                        value={password}
                        required
                        autoComplete="new-password"
                        onChange={(e) => 
                            setPassword(e.target.value)
                        }
                    />
                </div>
                <button type="submit">
                    Create Account
                </button>
            </form>

            {message && (
                <p className="auth-error"
                    aria-live="polite"
                >
                    {message}
                </p>
            )}
                
            <div className="auth-link">
                Already have an account?{" "}
                <Link to="/login">
                        Login here
                </Link>
            </div>
            </div>
        </div>
    );
}

export default RegistrationPage;