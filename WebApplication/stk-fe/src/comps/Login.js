import React, { useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from 'react-router-dom';
import ajax from '../Services/fetchService';

const Login = () => {

    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("heslo");

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userId, setUserId] = useLocalState("", "userId");
    const [auth, setAuth] = useLocalState("", "auth");
    const [office, setOffice] = useLocalState("", "office");

    const navigate = useNavigate();

    function sendLoginRequest() {
        
        const reqBody = {
            username: username,
            password: password
        };
        
        ajax("user/login", "POST", null, reqBody).then(async (data)=> {
            await setJwt("Bearer " + data.jwttoken);
            await setUserId(data.id);
            await setAuth(data.authorities[0].authority);
            await ajax(`/user/getUser/${data.id}`, "GET", "Bearer " + data.jwttoken).then((result) => {
                if(result.branchOfficeDto != null) {
                    setOffice(result.branchOfficeDto.id);
                }else{
                    setOffice(0);
                }
                
            });

            if(auth === "ROLE_Admin"){
                window.location.replace("/home");
            }
            else{
                window.location.replace("/profile");
            }
        });
        
    }

    return (
        <div>
            <div className="flex w-full h-screen bg-gray-100">
                <div className="w-full flex items-center justify-center">
                    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 text-center">
                        <div className="mx-auto w-64 pb-8">
                            <img src="https://www.pr-auto.cz/wp-content/uploads/2020/09/stk_a_emise.jpg" alt="stk logo" />
                        </div>
                        <h1 className="text-5xl font-semibold">STK</h1>
                        <p className="font-medium text-lg text-gray-500 mt-4">Prosím, zadejte své přihlašovací údaje</p>
                        <div className="mt-8">
                            <div>
                                <label className="text-lg font-medium">Uživatelské jméno</label>
                                <input className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte Vaše uživatelské jméno" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                            </div>
                            <div>
                                <label className="text-lg font-medium">Heslo</label>
                                <input className="w-full border-2 border-gray-100 rounded-xl mt-1 p-4 bg-transparent text-center" placeholder="Zadejte Vaše heslo" type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            <div className="active:scale-[.99] active:duration-75 hover:scale-[1.01] ease-in-out mt-8 flex flex-col gap-y-4">
                                <button className="py-4 rounded-xl bg-red-600 text-white text-lg font-bold" id="submit" type='button' onClick={() => sendLoginRequest()}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;