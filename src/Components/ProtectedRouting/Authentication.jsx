import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

// Protects pages from unauthorized access
// children = page/component to protect
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    // Ternary operator: return children if auth = true, else redirect to login
    return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute