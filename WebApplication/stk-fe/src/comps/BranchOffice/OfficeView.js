import React, { useEffect, useState } from 'react'
import { useLocalState } from '../../util/useLocalStorage';
import { Link } from 'react-router-dom';
import Office from './Office';
import ajax from '../../Services/fetchService';
import Navbar from '../../components/Navbar';


const OfficeView = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [auth, setAuth] = useLocalState("", "auth");
    const [officeData, setOfficeData] = useState(null);

    const [district, setDistrict] = useState("District");
    const [region, setRegion] = useState("Region");
    const [city, setCity] = useState("City");
    const officeId = window.location.href.split("/office/")[1];

    useEffect(() => {
        ajax(`/branchOffice/getOffice/${officeId}`, "GET", jwt)
            .then((data) => {
                setOfficeData(data);
                setCity(data.city);
                setRegion(data.region);
                setDistrict(data.district);
            });

    }, [])

    function returnBack() {
        return "";
    }

    function editOffice() {

        const reqBody = {
            region: region,
            district: district,
            city: city
        };

        ajax(`/branchOffice/editOffice/${officeId}`, "PUT", jwt, reqBody).then(window.location.reload());
    }

    function deleteUserFromOffice(prop){
        //ajax('/branchOffice/removeUserFromOffice', "DELETE", jwt).then();
        console.log("DELETE USER: " + prop + " from office id: " + officeId);
    }

    return (
        <div className='bg-gray-100 h-screen  '>
            <Navbar />
            <div className='mx-auto p-10 pt-32 text-center w-full bg-gray-100'>
                <div className=''>
                    <div className='bg-white p-5 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>

                        {
                            officeData ?
                                (<div>
                                    <div className='p-5'>
                                        <label className='my-auto mr-5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={officeId} readOnly />
                                    </div>
                                    <div className='p-5'>
                                        <label className='my-auto mr-5'>District:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={district} onChange={(event) => setDistrict(event.target.value)} />
                                    </div>
                                    <div className='p-5'>
                                        <label className='my-auto mr-5'>Region:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={region} onChange={(event) => setRegion(event.target.value)} />
                                    </div>
                                    <div className='p-5'>
                                        <label className='my-auto mr-5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={city} onChange={(event) => setCity(event.target.value)} />
                                    </div>
                                </div>)
                                : (<div></div>)
                        }

                        <button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold' onClick={() => editOffice()}>EDIT</button>
                        <Link to={"/office"}><button className='m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold'>BACK</button></Link>
                    </div>
                </div>
                <div className='mx-auto pt-32 h-auto text-center w-full bg-gray-100  md:w-1/2'>
                    <div className='mx-auto p-5 text-center'>
                        <div className='flex-wrap bg-white px-10 rounded-3xl border-2 border-gray-200 text-center'>
                            {officeData ? (
                                <div>
                                    <div>
                                        <div className=''>
                                            <table className='w-full text-sm text-center m-5'>
                                                <thead className='text-xs uppercase bg-gray-50'>
                                                    <tr className='bg-white border-b'>
                                                        <th className='py-3 px-6'>Username</th>
                                                        <th className='py-3 px-6'>Email</th>
                                                        <th className='py-3 px-6'>Job Positon</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {officeData.users.map(user => (
                                                        <tr key={user.id} className="bg-white border-b">
                                                            <td className='p-5'>{user.username}</td>
                                                            <td className='p-5'>{user.email}</td>
                                                            <td className='p-5'>{user.jobPosition}</td>
                                                            <td><button className='m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold' onClick={() => deleteUserFromOffice(user.id)}>DELETE</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficeView