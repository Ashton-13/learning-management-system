import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
    const dispatch = useDispatch();
    const { isAuthenticated, role } = useSelector(
        (state) => state.auth
    );

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 20px",
                borderBottom: "1px solid #ccc",
            }}
        >
            <div>
                <h2>Science Academy</h2>
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
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

            <div style={{ display: "flex", gap: "10px" }}>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;