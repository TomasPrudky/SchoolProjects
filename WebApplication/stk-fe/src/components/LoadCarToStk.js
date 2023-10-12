export default function LoadCarToStk(params) {
    
    return(
        <div>
            <div className="flex w-full h-screen bg-gray-100">
                <div className="w-full flex items-center justify-center">
                    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 text-center  w-10/12 md:w-1/2 duration-700">
                        <h1 className="text-5xl font-semibold">STK</h1>
                        <p className="font-medium text-lg text-gray-500 mt-4">Zadejte VIN kód auta.</p>
                        <div className="mt-8">
                            <div>
                                <label className="text-lg font-medium">VIN</label>
                                <input className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte VIN kód" />
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