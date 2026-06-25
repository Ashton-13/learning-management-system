import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, allowedRole }) {

    const { isAuthenticated, role } = useSelector(
        (state) => state.auth
    );
    console.log(
        "ProtectedRoute:",
        isAuthenticated,
        role
    );

    // User is not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }


// User has the incorrect role
if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" />;
}

// User is allowed
return children;

}

export default ProtectedRoute;