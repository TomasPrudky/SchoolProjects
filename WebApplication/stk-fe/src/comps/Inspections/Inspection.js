import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';

const Inspection = () => {

  const [jwt, setJwt] = useLocalState("", "jwt");
  const inspectionId = window.location.href.split("/inspectionDetail/")[1];
  const [inspection, setInspection] = useState(null);

  useEffect(() => {
    ajax(`/inspection/getInspection/${inspectionId}`, "GET", jwt).then((data) => { setInspection(data); console.log(data); });
  }, [])


  function downloadPDF() {
    fetch(`/inspection/getPDF/${inspectionId}`, {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Authorization': jwt
      },
      method: "GET"
    }).then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'Inspection.pdf';
        alink.click();
      })
    })

    ajax(`/inspection/getPDF/${inspectionId}`, "GET", jwt).then((response) => response.blob);
  }

  function getExpiryDate(props) {
    if(props != null){
      const e = props.expiryDateOfSTK;
      if(e != null){
        const expDate = `${e[2]}. ${e[1]}. ${e[0]}`;
        return expDate;
      }
    }
    return "";
  }

  function getSpz(props) {
    if(props != null) return props.spz;
    return "";
  }


  return (
    <div className='bg-gray-100 h-screen  '>
      <Navbar />
      <div className='mx-auto p-10 pt-32 text-center w-full bg-gray-100'>
        <div className=''>
          <div className='bg-white p-5 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>
            <div className='p-5'><label className="text-lg font-medium">Detail</label></div>
            <div className=''>{inspection ?
              <div className=''>
                <div className='flex justify-center'>
                  <label className='my-auto mr-5'>Jméno pracoviníka:</label>
                  <div>{inspection.userDto.fullName}</div>
                </div>
                <div className='flex justify-center'>
                  <label className='my-auto mr-5'>Datum prohlídky:</label>
                  <div>{`${inspection.date[2]}. ${inspection.date[1]}. ${inspection.date[0]}`}</div>
                </div>
                <div className='flex justify-center'>
                  <label className='my-auto mr-5'>Čas prohlídky:</label>
                  <div>{inspection.inspectionTime}</div>  
                </div>
                <div className='flex justify-center'>
                  <label className='my-auto mr-5'>Pobočka:</label>
                  <div>{inspection.branchDto.region}, {inspection.branchDto.district}, {inspection.branchDto.city}</div>
                </div>
                <div className='flex justify-center'>
                  <label className='my-auto mr-5'>SPZ:</label>
                  <div>{getSpz(inspection.carDto)}</div>  
                </div>
                <div className='flex justify-center'>
                  <label className='my-auto mr-5'>Datum expirace kontroly:</label>
                  <div>{getExpiryDate(inspection.carDto)}</div>  
                </div>
              </div> : <></>}</div>
            <div className='p-5'>
              <table className='w-full text-sm text-center bg-white mx-auto flex-wrappx-10 border-2 border-gray-200 rounded-3xl '>
                <thead className='text-xs uppercase bg-gray-50'>
                  <tr className='bg-white border-b'>
                    <th className='py-3 px-6'>Popis chyby</th>
                    <th className='py-3 px-6'>Vážnost závady</th>
                  </tr>
                </thead>
                <tbody>
                  {inspection ? inspection.faultsOfInspectionList.map((ins, index) =>
                    <tr key={index} className="bg-white border-b">
                      <td className='p-5'>{ins.faultDescription}</td>
                      <td className='p-5'>{ins.typeOfFault}</td>
                    </tr>)
                    :
                    <tr>
                    </tr>
                  }
                </tbody>
              </table>

              <button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold' onClick={() => downloadPDF()}>DOWNLOAD</button>
              <Link to={"/inspections"}><button className='m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold'>BACK</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inspection