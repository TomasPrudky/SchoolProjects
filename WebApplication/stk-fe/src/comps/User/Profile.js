import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';

const Profile = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userId, setUserId] = useLocalState("", "userId");
    const [user, setUser] = useState(null);

    useEffect(() => {
        ajax(`/user/getUser/${userId}`, "GET", jwt).then((data) => { setUser(data) });
    }, [])


    function goBack() {
        window.location.replace("/inspection");
    }

    return (
        <div>
            <Navbar />
            <div className='mx-auto p-10 pt-32 text-center w-full h-screen bg-gray-100'>
                <div className=''>
                    <div className='bg-white p-5 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>
                        {user ? <div>
                            <div className='p-5'>
                                <label className="text-lg font-medium">Uživatelské jmeno: {user.username}</label>
                            </div>
                            <div className='p-5'>
                                <label className="text-lg font-medium">Jméno přijmení: {user.fullName}</label>
                            </div>
                            <div className='p-5'>
                                <label className="text-lg font-medium">Email: {user.email}</label>
                            </div>
                            <div className='p-5'>
                                <label className="text-lg font-medium">Pozice: {user.jobPosition}</label>
                            </div>
                            <div className='p-5'>
                                <label className="text-lg font-medium">Role: {user.role.description}</label>
                            </div>
                            <div className='p-5'>
                                <label className="text-lg font-medium">Počet dětí: {user.numberOfChildren}</label>
                            </div>
                            <div className='p-5'>
                                <label className="text-lg font-medium">Hodinová sazba: {user.hourRate},-Kč/h</label>
                            </div>
                            <div className='p-5'>
                                {user.branchOfficeDto ? <label className="text-lg font-medium">Pobočka: {user.branchOfficeDto.region}, {user.branchOfficeDto.district}, {user.branchOfficeDto.city}</label>
                                    : <></>}
                            </div>

                        </div> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile