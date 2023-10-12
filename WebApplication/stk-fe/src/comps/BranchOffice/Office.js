import React, { useEffect, useState } from 'react'
import { useLocalState } from '../../util/useLocalStorage';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import ajax from '../../Services/fetchService';


const Office = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [auth, setAuth] = useLocalState("", "auth");
    const [officeData, setOfficeData] = useState(null);

    const [district, setDistrict] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [order, setOrder] = useState("ASC");

    useEffect(() => {
        ajax("branchOffice/getAllOffices", "GET", jwt).then((data) => {
            setOfficeData(data);
        });
    }, [])

    function deleteOfficeById(props) {
        console.log('DELETE office with id: ' + props);
        ajax("branchOffice/removeOffice/" + props, "DELETE", jwt)
            .then(window.location.reload());
    }

    function eidtOfficeById(props) {
        console.log('EDIT office with id: ' + props);
    }

    function addOffice() {
        const reqBody = {
            region: region,
            district: district,
            city: city
        };

        ajax("branchOffice/addOffice", "POST", jwt, reqBody).then(window.location.reload());
    }

    const sortingString = (col) => {
        if (order === "ASC") {
            const sorted = [...officeData].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setOfficeData(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...officeData].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setOfficeData(sorted);
            setOrder("ASC");
        }
    }

    const sortingNumber = (col) => {
        if (order === "ASC") {
            const sorted = [...officeData].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            setOfficeData(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...officeData].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setOfficeData(sorted);
            setOrder("ASC");
        }
    }

    return (
        <div className='bg-gray-100 h-screen  '>
            <Navbar />
            <div className='mx-auto p-10 pt-32 text-center w-full bg-gray-100'>
                <div className=''>
                    <div className='bg-white p-5 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>
                        <div className="flex py-1 justify-center">
                            <label className="my-auto mr-5">District:</label>
                            <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte district" id="district" value={district} onChange={(event) => setDistrict(event.target.value)} />
                        </div>
                        <div className='flex py-1 justify-center'>
                            <label className="my-auto mr-5">Region:</label>
                            <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte region" id="region" value={region} onChange={(event) => setRegion(event.target.value)} />
                        </div>
                        <div className='flex py-1 justify-center'>
                            <label className="my-auto mr-5">&nbsp;&nbsp;&nbsp;&nbsp;City:</label>
                            <input className="w-10/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte city" id="city" value={city} onChange={(event) => setCity(event.target.value)} />
                        </div>
                        <button className="m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold" id="submit" type='button' onClick={() => addOffice()}>SUBMIT</button>
                    </div>
                    <div className='py-5'>
                    </div>
                    <div className='bg-white p-5 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>
                        <table className='w-full text-sm text-center'>
                            <thead className='text-xs uppercase bg-gray-50'>
                                <tr className='bg-white border-b'>
                                    <th className='py-3 px-6'  onClick={() => sortingNumber("id")}>ID</th>
                                    <th className='py-3 px-6'  onClick={() => sortingString("district")}>District</th>
                                    <th className='py-3 px-6'  onClick={() => sortingNumber("region")}>Region</th>
                                    <th className='py-3 px-6'  onClick={() => sortingNumber("city")}>City</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {officeData ? officeData.map((office) =>
                                    <tr key={office.id} className="bg-white border-b">
                                        <td className='p-5'>{office.id}</td>
                                        <td className='p-5'>{office.district}</td>
                                        <td className='p-5'>{office.region}</td>
                                        <td className='p-5'>{office.city}</td>
                                        <td><Link to={`/office/${office.id}`}><button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold' onClick={() => eidtOfficeById(office.id)}>EDIT</button></Link></td>
                                        <td><button className='m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold' onClick={() => deleteOfficeById(office.id)}>DELETE</button></td>
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
        </div>
    )
}

export default Office