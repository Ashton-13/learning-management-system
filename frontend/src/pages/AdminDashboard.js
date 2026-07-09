import { useSelector } from "react-redux";
import AdminUserTable from "../components/AdminUserTable";
import AdminCourseTable from "../components/AdminCourseTable";
import "../styles/admin.css";

function AdminDashboard() {

    const { username } = useSelector((state) => state.auth);

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                
            <h1>Admin Dashboard</h1>

            <p>Welcome, {username}. Manage users and courses from here.</p>

            </header>

            <AdminUserTable />

            <AdminCourseTable />
            
        </div>
    );
}

export default AdminDashboard;