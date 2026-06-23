import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>LMS</h2>

            <ul>
                <li>
                    <Link to="/">Courses</Link>
                </li>

                <li>
                    <Link to="/login">Login</Link>
                </li>

                <li>
                    <Link to="/register">Register</Link>
                </li>

                <li>
                    <Link to="/student">Student Dashboard</Link>
                </li>

                <li>
                    <Link to="/teacher">Teacher Dashboard</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;