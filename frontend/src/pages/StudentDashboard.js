import { useSelector } from "react-redux";

function StudentDashboard() {
    
    const { username, role } = useSelector(
        (state) => state.auth
    );
    
    return (
        <div>
            <h1>Student Dashboard</h1>

            <p>Welcome, {username}</p>
            <p>Role: {role}</p>
            <h2>My Coures</h2>
            <p>Enrolled courses will appear here</p>
        </div>
    );
}

export default StudentDashboard;