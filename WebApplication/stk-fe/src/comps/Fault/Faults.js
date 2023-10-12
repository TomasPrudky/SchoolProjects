import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';

const Faults = () => {

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [faults, setFaults] = useState(null);

  useEffect(() => {
    ajax("/fault/getAllFaults", "GET", jwt).then((data) => setFaults(data));
  }, [])


  return (
    <div className='bg-gray-100'>
      <Navbar />
      <div className='mx-auto p-10 pt-32 text-center w-full md:w-1/2'>
        <div className=''>
          <div className='p-5 bg-white px-10 rounded-3xl border-2 border-gray-200 text-center overflow-x-auto relative'>
            <table className='w-full text-sm text-center'>
              <thead className='text-xs uppercase bg-gray-50'>
                <tr className='bg-white border-b'>
                  <th className='py-3 px-6'>ID</th>
                  <th className='py-3 px-6'>Typ závady</th>
                  <th className='py-3 px-6'>Popis</th>
                  <th className='py-3 px-6'>Známka</th>
                </tr>
              </thead>
              <tbody>
                {faults ? faults.map((fault) =>
                  <tr key={fault.id} className="bg-white border-b">
                    <td className='p-5'>{fault.id}</td>
                    <td className='p-5'>{fault.description}</td>
                    <td className='p-5'>{fault.typeOfFault.description}</td>
                    <td className='p-5'>{fault.typeOfFault.designation}</td>
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

export default Faults