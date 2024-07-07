'use client'
import { addCaffiene, getCaffieneConsumption } from "@/actions";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function TrackCaffiene({ setSelected }) {

    const router = useRouter();

    const [consumed, setConsumed] = useState('')
    const [zone, setZone] = useState('Safe');
    const [coldDrink, setColdDrink] = useState(0)
    const [coffee, setCoffee] = useState(0)
    const pda = 400;

    const checkAndSetZone = (amount) => {
        let ref = '';
        if (amount < 300) ref = "Safe"
        if (amount > 300 || amount < 400) ref = "Alert"
        if (amount > 400) ref = "Danger"
        setZone(ref);
    }

    const updateCoffe = () => {
        setCoffee(prev => prev + 1);
        return;
    }

    const udpateColdDrink = () => {
        setColdDrink(prev => prev + 1)
        return;
    }


    useEffect(()=>{
        const getConsumed = async () => {
            const response = await getCaffieneConsumption();
            setConsumed(response);
            checkAndSetZone(response);
        }

        getConsumed();
    }, [])

    const handleAdd = async (type, quantity)=> {
        const response  = await addCaffiene(type, quantity);
        if (!response) {
            alert("unable to add")
            return;
        }
        alert("added");
    }


    return (
        <div className="flex flex-col text-xl">
            <div
                onClick={()=>setSelected()}
                className="cursor-pointer"
            >
                back
            </div>

            <div className="flex flex-col gap-2 pt-4">
                <section>
                    <span className={`text-3xl border-b-2 ${zone === "Safe" ? 'border-green-300' : zone === "Alert" ? "border-orange-300" : "border-red-300"}`}>{zone}</span>
                    <p className="mt-4">{`you are on ${zone} side of caffiene consumption`}</p>
                </section>

                <section className="flex justify-between pr-20 text-3xl mt-10">
                    <div>
                        <span>{consumed}</span>
                        <span>consumed</span>
                    </div>
                    <div>
                        400
                    </div>
                </section>

                <section className="flex gap-28 mt-14">
                    <div className="flex">
                        <div 
                            className="flex justify-center items-center text-md w-40 h-14 border gap-2"
                            onClick={udpateColdDrink}
                        >
                            <span>Cold Drink</span>
                            { coldDrink > 0 && <span className="text-base">{coldDrink}</span>}
                        </div>
                        <div 
                            className="flex justify-center items-center text-md w-40 h-14 border gap-2"
                            onClick={updateCoffe}
                        >
                            Coffee
                            { coffee > 0 && <span className="text-base">{coffee}</span>}
                        </div>
                    </div>

                    <button
                        onClick={()=>{handleAdd ("Coffee", coffee )}}
                    >
                        ADD
                    </button>
                </section>
            </div>
        </div>
    )
}