import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';

const Inepections = () => {

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [data, setData] = useState(null);
  const [office, setOffice] = useLocalState("", "office");
  const [order, setOrder] = useState("ASC");


  useEffect(() => {
    if(office === 0){
      ajax(`/inspection/getAllInspections/`, "GET", jwt).then((response) => {
        setData(response);
      })
    }else{
      ajax(`/branchOffice/getOffice/${office}`, "GET", jwt).then((response) => {
        setData(response.inspections);
      });
    }
  }, [])

const sortingNumber = (col) => {
    if(order === "ASC"){
        const sorted = [...data].sort((a,b) => 
            a[col] > b[col] ? 1 : -1
        );
        setData(sorted);
        setOrder("DSC");
    }
    if(order === "DSC"){
        const sorted = [...data].sort((a,b) => 
            a[col] < b[col] ? 1 : -1
        );
        setData(sorted);
        setOrder("ASC");
    }
}

  return (
    <div className='bg-gray-100 h-screen  '>
      <Navbar />
      <div className='mx-auto p-10 pt-32 text-center w-full bg-gray-100'>
        <div className=''>
          <div className='bg-white p-5 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>
            <table className='w-full text-sm text-center'>
              <thead className='text-xs uppercase bg-gray-50'>
                <tr className='bg-white border-b'>
                  <th className='py-3 px-6' onClick={() => sortingNumber("id")}>Číslo kontroly</th>
                  <th className='py-3 px-6' onClick={() => sortingNumber("inspectionTimr")}>Doba kontroly v minutách</th>
                  <th className='py-3 px-6' onClick={() => sortingNumber("date")}>Datum kontroly</th>
                  <th>' '</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data ? data.map((inspection) =>
                  <tr key={inspection.id} className="bg-white border-b">
                    <td className='p-5'>{inspection.id}</td>
                    <td className='p-5'>{inspection.inspectionTime}</td>
                    <td className='p-5'>{inspection.date[2]}. {inspection.date[1]}. {inspection.date[0]}</td>
                    <td><Link to={`/inspectionDetail/${inspection.id}`}><button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold'>OPEN</button></Link></td>
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

export default Inepections