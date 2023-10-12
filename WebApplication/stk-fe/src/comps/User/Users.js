import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';
import { Link } from 'react-router-dom';

const Users = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    const [users, setUsers] = useState(null);
    const [roles, setRoles] = useState(null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [job, setJob] = useState("");
    const [role, setRole] = useState(0);
    const [kids, setKids] = useState(0);
    const [order, setOrder] = useState("ASC");
    const [idOffice, setIdOffice] = useState(0);
    const [fullname, setFullname] = useState("");
    const [hourRate, setHourRate] = useState(0);

    useEffect(() => {
        ajax("user/getAllUsers", "GET", jwt)
            .then((data) => {
                setUsers(data);
            });
    }, [])

    useEffect(() => {
        ajax("user/getAllRoles", "GET", jwt)
            .then((data) => {
                setRoles(data);
            });

    }, [])

    function addUser() {
        const reqBody = {
            username: username,
            email: email,
            password: password,
            jobPosition: job,
            role: role,
            hourRate: hourRate,
            declarationOfTax: true,
            numberOfChildren: kids,
            fullName: fullname
        };
        ajax("user/addUser", "POST", jwt, reqBody).then((response) => {
            const rb = {
                userId: response.id,
                branchOfficeId: idOffice
            }
            ajax("branchOffice/addUserToOffice", "POST", jwt, rb).then(window.location.reload());
        });
    }

    function deleteUserById(prop) {
        ajax(`user/removeUser/${prop}`, "DELETE", jwt).then(window.location.reload());
    }

    const sortingString = (col) => {
        if(order === "ASC"){
            const sorted = [...users].sort((a,b) => 
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted);
            setOrder("DSC");
        }
        if(order === "DSC"){
            const sorted = [...users].sort((a,b) => 
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted);
            setOrder("ASC");
        }
    }
    
    const sortingNumber = (col) => {
        if(order === "ASC"){
            const sorted = [...users].sort((a,b) => 
                a[col] > b[col] ? 1 : -1
            );
            setUsers(sorted);
            setOrder("DSC");
        }
        if(order === "DSC"){
            const sorted = [...users].sort((a,b) => 
                a[col] < b[col] ? 1 : -1
            );
            setUsers(sorted);
            setOrder("ASC");
        }
    }

    return (
        <div className='bg-gray-100'>
            <Navbar />
            <div className='mx-auto p-10 pt-32 text-center w-full md:w-2/3'>
                <div className='bg-white px-10 rounded-3xl border-2 border-gray-200 text-center'>
                    <div className='p-5 text-xl'>Nový uživatel</div>
                    <div className="flex py-1 justify-center">
                        <label className="my-auto mr-5">Uživatelské jméno:</label>
                        <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="flex py-1 justify-center">
                        <label className="my-auto mr-5">Jméno a přijmení:</label>
                        <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte jméno a přijmení" id="fullname" value={fullname} onChange={(event) => setFullname(event.target.value)} />
                    </div>
                    <div className='flex py-1 justify-center'>
                        <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Email:</label>
                        <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" type="email" placeholder="Zadejte email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className='flex py-1 justify-center'>
                        <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Heslo:</label>
                        <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte password" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className='flex py-1 justify-center'>
                        <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Pozice:</label>
                        <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte název pozice" id="job" value={job} onChange={(event) => setJob(event.target.value)} />
                    </div>
                    <div className='flex py-1 justify-center'>
                        <label className="my-auto mr-5 whitespace-nowrap">&emsp;&emsp;&emsp;&emsp;Hodinová sazba:</label>
                        <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" type="number" placeholder="Koruny na hodinu" id="hourRate" value={hourRate} onChange={(event) => setHourRate(event.target.value)} />
                    </div>
                    <div className='flex py-1 justify-center'>
                        <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Role:</label>
                        <select className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte email" id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                            {roles ? roles.map((role) => <option key={role.id} value={role.id}>{role.description}</option>) : <></>}
                        </select>
                    </div>
                    <div className='flex py-1 justify-center'>
                        <label className="my-auto mr-5 whitespace-nowrap">&emsp;&emsp;&emsp;&emsp;Počet dětí:</label>
                        <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" type="number" placeholder="Zadejte počet dětí" id="kids" value={kids} onChange={(event) => setKids(event.target.value)} />
                    </div>
                    <div className='flex py-1 justify-center'>
                        <label className="my-auto mr-5 whitespace-nowrap">&emsp;&emsp;&emsp;&emsp;ID Pobočky:</label>
                        <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" type="number" placeholder="Zadejte počet dětí" id="idOffice" value={idOffice} onChange={(event) => setIdOffice(event.target.value)} />
                    </div>
                    <button className="m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold" id="submit" type='button' onClick={() => addUser()}>SUBMIT</button>
                </div>
                <div className='py-5'>
                </div>
                <div className='p-5 bg-white px-10 rounded-3xl border-2 border-gray-200 text-center overflow-x-auto relative'>
                    <table className='w-full text-sm text-center'>
                        <thead className='text-xs uppercase bg-gray-50'>
                            <tr className='bg-white border-b'>
                                <th className='py-3 px-6' onClick={() => sortingString("username")}>username</th>
                                <th className='py-3 px-6' onClick={() => sortingString("email")}>email</th>
                                <th className='py-3 px-6' onClick={() => sortingString("jobPosition")}>job position</th>
                                <th className='py-3 px-6' onClick={() => sortingString("role[description]")}>role</th>
                                <th className='py-3 px-6' onClick={() => sortingNumber("numberOfChildren")}>počet dětí</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? users.map((user) =>
                                <tr key={user.id} className="bg-white border-b">
                                    <td className='p-5'>{user.username}</td>
                                    <td className='p-5'>{user.email}</td>
                                    <td className='p-5'>{user.jobPosition}</td>
                                    <td className='p-5'>{user.role != null && user.role['description'] || ''}</td>
                                    <td className='p-5'>{user.numberOfChildren}</td>
                                    <td><Link to={`/user/${user.id}`}><button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold'>EDIT</button></Link></td>
                                    <td><button className='m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold' onClick={() => deleteUserById(user.id)}>DELETE</button></td>
                                </tr>)
                                :
                                <tr>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users