import { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({children}) => {
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"), "jwt");
    const [isAdmin, setIsAdmin] = useState(false);

    if (localStorage.getItem("roles") !== null && localStorage.getItem("roles").includes("ROLE_ADMIN")) setIsAdmin(true);
    
    return (jwt && isAdmin)? children : <Navigate to="/signin"/>
}

export default PrivateAdminRoute;