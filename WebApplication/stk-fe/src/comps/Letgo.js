import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';

const Letgo = () => {

    const navigate = useNavigate();
    const [jwt, setJwt] = useLocalState("", "jwt");

    useEffect(() => {
        localStorage.clear();
        setJwt("NULL");
        navigate("/login");
    }, [])
    
  return (
    <div>Logout</div>
  )
}

export default Letgo