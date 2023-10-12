import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const NewInspection = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [spz, setSpz] = useState("");
    const navigate = useNavigate();

    function submitSpz() {
        ajax(`/car/isCarStolenBySpz/${spz}`, "GET", jwt).then((data) => {
            //console.log(data);
            if (data === false) {
                navigate(`${spz}`);
            } //Tady se musí negovat data -> !data
            else {
                alert("Kradene auto");
            }
        });
    }

    return (
        <div>
            <Navbar />
            <div className='mx-auto p-10 pt-32 text-center w-full h-screen bg-gray-100'>
                <div className=''>
                    <div className='bg-white p-5 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>
                        <div className='p-5'><label className="text-lg font-medium">Zadejte SPZ auta ke kontrole</label></div>
                        <div className='p-5 text-center'><input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' placeholder='SPZ' value={spz} onChange={(event) => setSpz(event.target.value)} /></div>
                        <div className='p-5'><button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold' onClick={() => submitSpz()}>SUBMIT</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewInspection;