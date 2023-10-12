import React from 'react'

const Cars = () => {
    return (
        <div>
            <Navbar/>
            <div className='mx-auto p-10 pt-32 text-center w-full h-screen bg-gray-100'>
            <div className='bg-white px-10 rounded-3xl border-2 border-gray-200 text-center'>
                <div className="flex py-1 justify-center">
                    <label className="my-auto mr-5">Uživatelské jméno:</label>
                    <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className='flex py-1 justify-center'>
                    <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Email:</label>
                    <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='flex py-1 justify-center'>
                    <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Heslo:</label>
                    <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte password" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className='flex py-1 justify-center'>
                    <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Heslo:</label>
                    <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Potvrďtě password" id="confirmedPsw" type="password" value={confirmedPsw} onChange={(event) => setConfirmedPsw(event.target.value)} />
                </div>
                <div className='flex py-1 justify-center'>
                    <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Pozice:</label>
                    <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte název pozice" id="job" value={job} onChange={(event) => setJob(event.target.value)} />
                </div>
                <div className='flex py-1 justify-center'>
                    <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Role:</label>
                    <select className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte email" id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                        {roles ? roles.map((role) => <option key={role.id} value={role.id}>{role.description}</option>) : <></>}
                    </select>
                </div>
                <div className='flex py-1 justify-center'>
                    <label className="my-auto mr-5">&emsp;&emsp;&emsp;&emsp;&emsp;Počet dětí:</label>
                    <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte počet dětí" id="kids" value={kids} onChange={(event) => setKids(event.target.value)} />
                </div>
                <button className="m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold" id="submit" type='button' onClick={() => addUser()}>SUBMIT</button>
            </div>
            <div className='py-5'>
            </div>
            <div className='p-5 bg-white px-10 rounded-3xl border-2 border-gray-200 text-center overflow-x-auto relative'>
                <table className='w-full text-sm text-center'>
                    <thead className='text-xs uppercase bg-gray-50'>
                        <tr className='bg-white border-b'>
                            <th className='py-3 px-6'>id user</th>
                            <th className='py-3 px-6'>username</th>
                            <th className='py-3 px-6'>email</th>
                            <th className='py-3 px-6'>job position</th>
                            <th className='py-3 px-6'>role</th>
                            <th className='py-3 px-6'>poče dětí</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users ? users.map((user) =>
                            <tr key={user.id} className="bg-white border-b">
                                <td className='p-5'>{user.id}</td>
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

export default Cars