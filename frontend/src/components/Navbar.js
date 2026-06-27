import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import "../styles/Navbar.css";

function Navbar() {
    const dispatch = useDispatch();
    const { isAuthenticated, role } = useSelector(
        (state) => state.auth
    );

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        dispatch(logout());
    };

    return (
        <nav className="navbar">
            <div>
                <h2>Science Academy</h2>
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to='/courses'>Browse Courses</Link>

                {isAuthenticated && role === "student" && (
                    <Link to="/student">My Courses</Link>
                )}

                {isAuthenticated && role === "teacher" && (
                    <Link to="/teacher">Dashboard</Link>
                )}
                <a href="#contact">Contact</a>
            </div>

            <div className="auth-links">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;