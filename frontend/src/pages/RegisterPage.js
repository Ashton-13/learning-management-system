import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function RegistrationPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post(
                "api/register/",
                {
                    username,
                    email,
                    password,
                }
            );

            setMessage("Registration Successful!");

            console.log(response.data);

        } catch (error) {
            console.error(error);
            setMessage("Registration failed.");
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </div>
                <br />
                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
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
                        onChange={(e) => 
                            setPassword(e.target.value)
                        }
                    />
                </div>
                <br />
                <button type="submit">
                    Register
                </button>
                <p>Already have an account?{" "}
                    <Link to="/login">
                        Login here
                    </Link>
                </p>

            </form>
            <p>{message}</p>
        </div>
    );
}

export default RegistrationPage;