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

        try {
             await api.post("api/register/", {
                    username,
                    email,
                    password,
                }
            );

            navigate("/login");
        } catch (error) {
            alert("Registration failed.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => 
                            setPassword(e.target.value)
                        }
                    />
                </div>
                <button type="submit">
                    Create Account
                </button>
            </form>
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