import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';

export default function Navbar(){

    const[auth, setAuth] = useLocalState("", "auth");

    const links = [
        { name: "EXPORT/IMPORT", link: "/home", rights: "100"},
        { name: "PROHLIDKA", link: "/inspection", rights: "101"},   //rights: admin, manazer, technik 1-má právo | 0-nemá právo
        { name: "PROFIL", link: "/profile", rights: "111" },
        { name: "UŽIVATEL", link: "/user", rights: "100" },
        { name: "POBOČKA", link: "/office", rights: "100" },
        { name: "PROHLÍDKY", link: "/inspections", rights: "101" },
        { name: "ZÁVADY", link: "/faults", rights: "101" },
        { name: "MZDY", link: "/wage", rights: "110" },
        { name: "LOGOUT", link: "/letgo", rights: "111" },
    ];

    const [open, setOpen] = useState(false);

    function getElementToNav(props){
        const nav = (
            <li key={props.name} className="md:ml-8 text-xl md:my-0 my-7 whitespace-nowrap">
                <a href={props.link}>{props.name}</a>
            </li>);

        if(auth === 'ROLE_Admin' && props.rights[0] === "1"){
            return nav;
        }
        if(auth === 'ROLE_Technik' && props.rights[2] === "1"){
            return nav;
        }
        if(auth === 'ROLE_Manažer' && props.rights[1] === "1"){
            return nav;
        }
    }

    return (
        <div className="bg-red-600 w-full fixed top-0 left-0 h-16 text-white font-semibold z-50">
            <nav className="p-5 md:flex items-center justify-between">
                <div>

                </div>
                <div className="text-5xl absolute right-8 cursor-pointer md:hidden top-0" onClick={() =>setOpen(!open)}>
                    <div>&#8801;</div>
                </div>
                <div>
                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-red-600 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all
                    ${open ? 'top-10':'top-[-550px]'}`}>
                        {
                            links.map((link)=>(getElementToNav(link)))
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
}