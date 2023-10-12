import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';
import { Link } from 'react-router-dom';

const User = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [auth, setAuth] = useLocalState("", "auth");
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState(null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [job, setJob] = useState("");
    const [role, setRole] = useState(0);
    const [kids, setKids] = useState(0);
    const [hourRate, setHourRate] = useState(0);
    const [office, setOffice] = useState(null);

    const userId = window.location.href.split("/user/")[1];

    useEffect(() => {
        ajax(`/user/getUser/${userId}`, "GET", jwt)
            .then((data) => {
                setUser(data);
                setUsername(data.username);
                setEmail(data.email);
                setPassword(data.password);
                setJob(data.jobPosition);
                setRole(data.role.id);
                setKids(data.numberOfChildren);
                setHourRate(data.hourRate);
                setOffice(data.branchOfficeDto);
            });
    }, [])

    useEffect(() => {
        ajax("/user/getAllRoles", "GET", jwt)
            .then((data) => {
                setRoles(data);
            });

    }, [])

    function editUser() {
        const reqBody = {
            username: username,
            email: email,
            password: password,
            jobPosition: job,
            role: role,
            hourRate: hourRate,
            declarationOfTax: true,
            numberOfChildren: kids
        };

        ajax(`/user/editUser/${userId}`, "PUT", jwt, reqBody).then(window.location.reload());
    }

    return (
        <div>
            <Navbar />
            <div className='mx-auto p-10 pt-32 text-center w-full h-screen bg-gray-100'>
                <div className='mx-auto p-5 text-center '>
                    <div className='flex-wrap bg-white px-10 rounded-3xl border-2 border-gray-200 text-center'>
                        {
                            user ?
                                (<div>
                                    <div className='p-5 flex-wrap'>
                                        <label className='my-auto mr-5'>ID:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={userId} readOnly />
                                    </div>
                                    <div className='p-5 flex-wrap'>
                                        <label className='my-auto mr-5'>Uživatelské jméno:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={username} onChange={(event) => setUsername(event.target.value)} />
                                    </div>
                                    <div className='p-5 flex-wrap'>
                                        <label className='my-auto mr-5'>Email:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={email} onChange={(event) => setEmail(event.target.value)} />
                                    </div>
                                    <div className='p-5 flex-wrap'>
                                        <label className='my-auto mr-5'>Pozice:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={job} onChange={(event) => setJob(event.target.value)} />
                                    </div>
                                    <div className='p-5 flex-wrap'>
                                        <label className='my-auto mr-5'>Role:</label>
                                        <select defaultValue={role} className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" id="role" value={role.description} onChange={(event) => setRole(event.target.value)}>
                                            {roles ? roles.map((role) => <option key={role.id} value={role.id}>{role.description}</option>) : <></>}
                                        </select>
                                    </div>
                                    <div className='p-5 flex-wrap'>
                                        <label className='my-auto mr-5'>Počet dětí:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={kids} onChange={(event) => setKids(event.target.value)} />
                                    </div>
                                    <div className='p-5 flex-wrap'>
                                        <label className='my-auto mr-5'>Počet hodin:</label>
                                        <input className='w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={hourRate} onChange={(event) => setHourRate(event.target.value)} />
                                    </div>
                                </div>)
                                : (<div></div>)
                        }
                        <button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold' onClick={() => editUser()}>EDIT</button>
                        <Link to={"/user"}><button className='m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold'>BACK</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User