import React from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { checkAuth } from '../util/checkAuth';

const LoadCar = () => {

    checkAuth();

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [idUser, setId] = useLocalState("", "userId");
    const [auth, setAuth] = useLocalState("", "auth");

    function carInspection(){
        fetch("");
    }

    return (
        <div>
            <div className={`${(auth == 'ROLE_Admin') ? 'bg-yellow-200' : 'bg-blue-400'}`}>
                <h1>Main View</h1>
                <p>user id: {idUser}</p>
                <p>role: {auth}</p>
                <p>jwt: {jwt}</p>
            </div>
            <div className='bg-gray-200 p-5'>
                <label>VIN/SPZ</label>
                <input placeholder='Zadejte VIN/SPZ auta'/>
                <button onClick={()=> carInspection()}>Potvrdit!</button>
            </div>
        </div>
    );
}

export default LoadCar;