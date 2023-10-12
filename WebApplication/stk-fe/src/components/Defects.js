import { useState } from 'react';

export default function Defects(){

    const defects = [
        { name: "Brzdy", description: "Brzdy ipsum dolor sit amet, const adipiscing elit" },
        { name: "Elektrika", description: "Elektrika ipsum dolor sit amet, const adipiscing elit" },
        { name: "Kola", description: "Kola ipsum dolor sit amet, const adipiscing elit" },
        { name: "Vybava", description: "Vybava ipsum dolor sit amet, const adipiscing elit" },
        { name: "Motor", description: "Motor ipsum dolor sit amet, const adipiscing elit" },
        { name: "Turbo", description: "Turbo ipsum dolor sit amet, const adipiscing elit" },
        { name: "Převodovka", description: "Převodovka ipsum dolor sit amet, const adipiscing elit" },
    ];

    const [even, setEven] = useState(false);

    return(
        <div className="p-5 h-screen bg-gray-100 pt-36">
            <table className="w-full ml-auto mr-auto text-center">
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="p-3 text-sm font-semibold tracking-wide">Název závady</th>
                    <th className="p-3 text-sm font-semibold tracking-wide">Popis závady</th>
                </tr>
                    {
                        defects.map((defect) => (
                            <tr key={defect.name} className="divide-y divide-gray-100 whitespace-nowrap">
                                <td className="p-3 text-sm text-gray-700">{defect.name}</td>
                                <td className="p-3 text-sm text-gray-700">{defect.description}</td>
                            </tr>
                        ))
                    }
                    
                    {() => setEven(!even)}
            </table>
        </div>
    );
}