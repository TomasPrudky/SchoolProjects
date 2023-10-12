/**
 * import React, { useState } from 'react';

export default function LoginForm(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const renderErrorMessage = (name) => name === errorMessages.name && (
        <div>{errorMessages.message}</div>
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        var { uname, pass} = document.forms[0];

        console.log(uname, pass);
    };

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex w-full h-screen bg-gray-100">
                <div className="w-full flex items-center justify-center">
                    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 text-center">
                        <div className="text-center p-2">
                            <img src="https://www.pr-auto.cz/wp-content/uploads/2020/09/stk_a_emise.jpg" width="300" alt="stk logo"/>
                        </div>
                        <h1 className="text-5xl font-semibold">STK</h1>
                        <p className="font-medium text-lg text-gray-500 mt-4">Prosím, zadejte své přihlašovací údaje</p>
                        <div className="mt-8">
                            <div>
                                <label className="text-lg font-medium">Uživatelské jméno</label>
                                <input name="username" className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte Vaše uživatelské jméno"/>
                            </div>
                            <div>
                                <label className="text-lg font-medium">Heslo</label>
                                <input name="password" className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" type="password" placeholder="Zadejte Vaše heslo" />
                            </div>
                            <div className="active:scale-[.99] active:duration-75 hover:scale-[1.01] ease-in-out mt-8 flex flex-col gap-y-4">
                                <button className="py-4 rounded-xl bg-red-600 text-white text-lg font-bold">Přihlásit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
 */