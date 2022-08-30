import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
    const { auth } = useAuth()
    const location = useLocation()

    console.log(auth.username)
    // Outlet represents all the child components of RequireAuth
    // hence RequireAuth can protect all the child components nested inside of it
    return auth?.username ? (
        <Outlet />
    ) : (
        // i.e. if the user tries to access a page they aren't authorised to
        // they will be navigated to the enter page
        // and we replace /enter in their navigation with the location they came from
        <Navigate to="/enter" state={{ from: location }} replace />
    )
}

export default RequireAuth
