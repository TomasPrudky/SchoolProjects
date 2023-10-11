import { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"), "jwt");

    return jwt ? children : <Navigate to="/signin"/>
}

export default PrivateRoute;