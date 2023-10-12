export default function CarInspection(params) {
    
    const defects = [
        { name: "Brzdy", description: "Brzdy ipsum dolor sit amet, const adipiscing elit" },
        { name: "Elektrika", description: "Elektrika ipsum dolor sit amet, const adipiscing elit" },
        { name: "Kola", description: "Kola ipsum dolor sit amet, const adipiscing elit" },
        { name: "Vybava", description: "Vybava ipsum dolor sit amet, const adipiscing elit" },
        { name: "Motor", description: "Motor ipsum dolor sit amet, const adipiscing elit" },
        { name: "Turbo", description: "Turbo ipsum dolor sit amet, const adipiscing elit" },
        { name: "Převodovka", description: "Převodovka ipsum dolor sit amet, const adipiscing elit" },
    ];

    const znamky = [
        { type: "A" },
        { type: "B" },
        { type: "C" }
    ];

    return(
        <div>
            <div className="flex w-full py-32 bg-gray-100">
                <div className="w-full flex items-center justify-center">
                    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 text-center  w-10/12 md:w-1/2 duration-700">
                        <h1 className="text-5xl font-semibold">Technická prohlídka</h1>
                        <div className="p-5">
                            <p>Auto: Škoda Octavia 1.6</p>
                            <p>Majitel: Jmeno Prijmeni</p>
                            <p>Najeto: 350161 Km</p>
                            <p>Rok výroby: 2006</p>
                        </div>
                        <p className="font-medium text-lg text-gray-500 mt-4">Zadejte údaje dle stavu vozidla.</p>
                        <div className="mt-8">
                            <div>
                                {
                                    defects.map((defect)=>(
                                        <div className="flex">
                                            <label className="text-lg font-medium m-auto">{defect.name}</label>
                                            <input className="w-9/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Popis problému" />
                                            <select className="mx-5 px-2">
                                                {
                                                    znamky.map((z)=>(
                                                        <option value={z.type}>{z.type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="pt-12">
                                <label className="text-lg font-medium m-auto">Délka práce</label>
                                <input className="w-9/12 border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Délka práce v minutách" />
                            </div>
                            <div className="active:scale-[.99] active:duration-75 hover:scale-[1.01] ease-in-out mt-8 flex flex-col gap-y-4">
                                <button className="py-4 rounded-xl bg-red-600 text-white text-lg font-bold">Potvrdit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}