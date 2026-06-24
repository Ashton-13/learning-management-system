import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { loginSuccess } from "../features/auth/authSlice";

function LoginPage() {

    // Store form inputs using React state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Displays success or error messages
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

            const accessToken = tokenResponse.data.access;

            // Saves token so user stays logged in after refresh
            localStorage.setItem(
                "accessToken",
                accessToken
            );

            // Request info about user that is logged in
            const userResponse = await api.get(
                "api/me/",
                {
                    headers: {
                        Authorization:
                        `Bearer ${accessToken}`,
                    },
                }
            );

            const user = userResponse.data;

            // Store authentication information in Redux
            dispatch(
                loginSuccess({
                    token: accessToken,
                    username: user.username,
                    role: user.role,
                })
            );

            setMessage("Login Successful!");

            // Redirects based on user's role
            if (user.role === "teacher") {
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
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                
                <div>
                    <label>Username</label>
                    <br />

                    <input 
                        type="text"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />

                    <input 
                        type="password"
                        value={password}
                        onChange={(event) => 
                            setPassword(event.target.value)
                        }
                    />
                </div>

                <br />

                <button type="submit">Login</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default LoginPage;