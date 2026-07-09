import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { loginSuccess } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Requests JWT tokens from Django
        try {
            const tokenResponse = await api.post(
                "api/token/",
                {
                    username,
                    password,
                }
            );
            
            console.log("TOKEN RESPONSE:",
            tokenResponse.data
            );
            const accessToken = tokenResponse.data.access;

            
            localStorage.setItem(
                "accessToken",
                accessToken
            );

            
            const userResponse = await api.get(
                "api/me/",
                {
                    headers: {
                        Authorization:
                        `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(
                "USER RESPONSE:",
                userResponse.data
            );

            const user = userResponse.data;

            localStorage.setItem(
                "username",
                user.username
            );

            localStorage.setItem(
                "role",
                user.role
            );

            
            dispatch(
                loginSuccess({
                    token: accessToken,
                    username: user.username,
                    role: user.role,
                })
            );

            //setMessage("Login Successful!");

            // Redirects based on user's role
            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "teacher") {
                navigate("/teacher");
            } else {
                navigate("/student");
            }
            
        } catch (error) {

            console.error(error);

            setMessage(
                "Invalid username or password"
            );
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">    
                <h1>Login</h1>

                    <form onSubmit={handleSubmit}>
                
                        <label htmlFor="username">Username</label>
                        <input 
                            id="username"
                            type="text"
                            value={username}
                            required
                            autoComplete="username"
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                        />
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password"
                            value={password}
                            required
                            autoComplete="current-password"
                            onChange={(event) => 
                                setPassword(event.target.value)
                            }
                        />

                        <button type="submit">Login</button>

                    </form>
                    
                        {message && (
                            <p className="auth-error"
                                aria-live="polite"
                            >
                                {message}
                            </p>
                        )}

                        <div className="auth-link">
                            Don't have an account yet?{" "}
                            <Link to="/register">
                                Register here
                            </Link>
                        </div>
            </div>
        </div>
    );
}

export default LoginPage;