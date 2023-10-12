import React from 'react'
import Navbar from '../components/Navbar'
import ajax from '../Services/fetchService';
import { useLocalState } from '../util/useLocalStorage';

const Home = () => {

  const [jwt, setJwt] = useLocalState("", "jwt");

  const importData = async e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {

      console.log(reader.result);
      ajax(`/branchOffice/importData`, "PUT", jwt, JSON.parse(reader.result)).then(alert("IMPORT WAS OK!"));
    }
  }

  function exportData() {
    console.log("Export");
    ajax("/branchOffice/exportData", "GET", jwt).then((response) => {
      var file = new Blob([JSON.stringify(response)], {type: 'text/plain'});
      let a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = "export.json";
      a.click();

    });
  }
  return (
    <div>
      <Navbar />
      <div className='mx-auto my-32 text-center'>
        <div>
          <div>
            <input className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold' id="selectedFile" type="file" onChange={importData} />
          </div>
          <div>
            <button className='m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold' onClick={() => exportData()}>EXPORT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home