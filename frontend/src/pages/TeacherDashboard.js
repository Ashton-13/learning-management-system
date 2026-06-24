import { useSelector } from "react-redux"

function TeacherDashboard() {

    const { username, role } = useSelector(
        (state) => state.auth
    );
    return (
        <div>
            <h1>Teacher Dashboard</h1>
            <p>Welcome, {username}</p>
            <p>Role: {role}</p>
            <h2>Course Management</h2>
            <p>Course creation and editing toosl will appear here</p>
        </div>
    );
}

export default TeacherDashboard;