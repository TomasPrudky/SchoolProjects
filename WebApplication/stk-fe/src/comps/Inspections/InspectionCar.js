import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ajax from '../../Services/fetchService'
import { useLocalState } from '../../util/useLocalStorage'

const InspectionCar = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userId, setUserId] = useLocalState("", "userId");
    const [office, setOffice] = useLocalState("", "office");

    const [faults, setFaults] = useState(null);
    const [spz, setSpz] = useState((window.location.href.split("/inspection/")[1]).replace("%20", " "));
    const [car, setCar] = useState(null);

    const [brzdy, setBrzdy] = useState(0);
    const [geometrie, setGeometrie] = useState(0);
    const [osvetleni, setOsvetleni] = useState(0);
    const [karoserie, setKaroserie] = useState(0);
    const [kola, setKola] = useState(0);
    const [time, setTime] = useState(0);
    const [vin, setVin] = useState("");
    const [expiryDate, setExpiryDate] = useState(getDate());

    useEffect(() => {

        ajax("/fault/getAllFaults", "GET", jwt).then((data) => {
            setFaults(data);
        });

        ajax(`/car/getCarInfoFromCrvBySpz/${spz}`, "GET", jwt).then((data) => {
            if (data != null) {
                setCar(data);
                setVin(data.vin);
            }
        });
    }, [])

    function getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    }

    function submitInspection() {

        const body = {
            operable: "Y",
            spz: spz,
            vin: vin,
            expiryDateOfSTK: expiryDate,
        }

        if (office === 0) setOffice(1);

        if (car != null) {
            body.spz = car.spz;

            ajax(`/car/editCar/${car.id}`, "PUT", jwt, body).then((data) => {

                const reqBody = {
                    inspectionTime: parseFloat(time),
                    date: getDate(),
                    car: data.id,
                    user: userId,
                    branchOffice: office,
                    geometryFault: parseInt(geometrie),
                    lightningFault: parseInt(osvetleni),
                    wheelFault: parseInt(kola),
                    bodyFault: parseInt(karoserie),
                    brakesFault: parseInt(brzdy)
                }

                ajax("/inspection/addInspectionWithFaults", "POST", jwt, reqBody).then((data) => { window.location.replace("/inspections") });
            });
        } else {
            ajax("/car/addCar", "POST", jwt, body).then((data) => {

                const reqBody = {
                    inspectionTime: parseFloat(time),
                    date: getDate(),
                    car: data.id,
                    user: userId,
                    branchOffice: office,
                    geometryFault: parseInt(geometrie),
                    lightningFault: parseInt(osvetleni),
                    wheelFault: parseInt(kola),
                    bodyFault: parseInt(karoserie),
                    brakesFault: parseInt(brzdy)
                }

                ajax("/inspection/addInspectionWithFaults", "POST", jwt, reqBody).then((data) => { window.location.replace("/inspections") });
            });
        }
    }

    return (
        <div>
            <Navbar />
            <div className='mx-auto p-10 pt-32 text-center w-full h-screen bg-gray-100'>
                <div className=''>
                    <div className='bg-white p-5 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>
                        <div className='p-5'><label className="text-lg font-medium">Kontrola</label></div>
                        <div className='flex justify-between'>
                            <label className='my-auto mr-5 w-40 text-right'>VIN</label>
                            <input className='border-2 w-full border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' value={vin} onChange={(event) => setVin(event.target.value)} placeholder='Zadejte VIN' />
                        </div>

                        <div className='flex justify-between'>
                            <label className='my-auto mr-5 w-40 text-right'>Brzdy</label>
                            <select id="brzdy" className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" value={brzdy} onChange={(event) => setBrzdy(event.target.value)}>
                                <option></option>
                                <option value={1}>A</option>
                                <option value={6}>B</option>
                                <option value={11}>C</option>
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label className='my-auto mr-5 w-40 text-right'>Geometrie</label>
                            <select id="geometrie" className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" value={geometrie} onChange={(event) => setGeometrie(event.target.value)}>
                                <option></option>
                                <option value={2}>A</option>
                                <option value={7}>B</option>
                                <option value={12}>C</option>
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label className='my-auto mr-5 w-40 text-right'>Osvětlení</label>
                            <select id="osvetleni" className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" value={osvetleni} onChange={(event) => setOsvetleni(event.target.value)}>
                                <option></option>
                                <option value={3}>A</option>
                                <option value={8}>B</option>
                                <option value={13}>C</option>
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label className='my-auto mr-5 w-40 text-right'>Kola</label>
                            <select id="kola" className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" value={kola} onChange={(event) => setKola(event.target.value)}>
                                <option></option>
                                <option value={4}>A</option>
                                <option value={9}>B</option>
                                <option value={14}>C</option>
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label className='my-auto mr-5 w-40 text-right'>Karoserie</label>
                            <select id="karoserie" className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" value={karoserie} onChange={(event) => setKaroserie(event.target.value)}>
                                <option></option>
                                <option value={5}>A</option>
                                <option value={10}>B</option>
                                <option value={15}>C</option>
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label className='my-auto mr-5 w-40 text-right'>Datum expirace STK</label>
                            <input className='border-2 w-full border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center' type="date" min={getDate()} value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)} />
                        </div>
                        <div className='flex justify-between'>
                            <label className='my-auto mr-5 w-40 text-right'>Délka práce v minutách</label>
                            <input className="border-2 w-full border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" type="number" placeholder="Zadejte Vaše uživatelské jméno" id="time" value={time} onChange={(event) => setTime(event.target.value)} />
                        </div>
                        <div className='p-5'>
                            <button className='m-3 p-1 px-3 rounded-lg bg-green-600 text-white text-lg font-bold' onClick={() => submitInspection()}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InspectionCar