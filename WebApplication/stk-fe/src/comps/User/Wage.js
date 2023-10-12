import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';

const Wage = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [office, setOffice] = useState(0);
    const [wages, setWages] = useState("");
    const [order, setOrder] = useState("ASC");

    function getWagesFromOffice() {        
        ajax(`branchOffice/getAllWages/${office}`, "GET", jwt).then((result) => {
            console.log(result);
            setWages(result);
        });

    }

    const sortingString = (col) => {
        if (order === "ASC") {
            const sorted = [...wages].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setWages(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...wages].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setWages(sorted);
            setOrder("ASC");
        }
    }

    const sortingNumber = (col) => {
        if (order === "ASC") {
            const sorted = [...wages].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            setWages(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...wages].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setWages(sorted);
            setOrder("ASC");
        }
    }

    return (
        <div className='bg-gray-100 h-screen'>
            <Navbar />
            <div className='mx-auto p-10 pt-32 text-center w-full '>
                <div className=''>
                    <div className='p-5'>
                        <input className="w-10/12 border-2 bg-white border-gray-200 rounded-xl mt-1 p-4 text-center" type="number" id="office" value={office} onChange={(event) => setOffice(event.target.value)} />
                        <button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold' onClick={(e) => getWagesFromOffice()}>SUBMIT</button>
                    </div>
                    <div className='p-5 bg-white px-10 rounded-3xl border-2 border-gray-200 text-center overflow-x-auto relative'>
                        <table className='w-full text-sm text-center'>
                            <thead className='text-xs uppercase bg-gray-50'>
                                <tr className='bg-white border-b'>
                                    <th className='py-3 px-6' onClick={() => sortingString("fullName")}>Jméno</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("numberOfChildren")}>Počet dětí</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("taxRelief")}>Daňové úlevy</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("healthInsurance")}>Zdravotní pojištění</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("socialInsurance")}>Sociální pojištění</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("tax")}>Daň</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("hourRate")}>Kč/h</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("numberOfInspection")}>Počet prohlídek</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("numberOfHoursWorked")}>Počet hodin</th>
                                    <th className='py-3 px-6' onClick={() => sortingNumber("monthSalary")}>Výplata</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wages ? wages.map((wage, index) =>
                                    <tr key={index} className="bg-white border-b">
                                        <td className='p-5'>{wage.fullName}</td>
                                        <td className='p-5'>{wage.numberOfChildren}</td>
                                        <td className='p-5'>{wage.taxRelief}</td>
                                        <td className='p-5'>{wage.healthInsurance}</td>
                                        <td className='p-5'>{wage.socialInsurance}</td>
                                        <td className='p-5'>{wage.tax}</td>
                                        <td className='p-5'>{wage.hourRate}</td>
                                        <td className='p-5'>{wage.numberOfInspection}</td>
                                        <td className='p-5'>{wage.numberOfHoursWorked}</td>
                                        <td className='p-5'>{wage.monthSalary},- Kč</td>
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

export default Wage