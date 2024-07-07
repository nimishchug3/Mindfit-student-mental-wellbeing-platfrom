'use client'

import { addCalorie, getCalorie } from "@/actions";
import { useState, useEffect } from "react"

export default function TrackCalories({setSelected}) {

    const [calories, setCalories] = useState(' ')

    const [zone, setZone] = useState("");

    const [milk, setMilk] = useState(0);
    const [chapati, setChapati] = useState(0);
    const [egg, setEgg] = useState(0);
    const [curry, setCurry] = useState(0)
    const [rice, setRice] = useState(0);
    const [bread, setBread] = useState(0)

    const checkZone = (ref) => {
        if (ref < 1500) {
            setZone("Deficiet")
        }
        if (ref > 1500 && ref < 2000) setZone('perfect');
        if (ref > 2000) setZone('Bulk')

        return;
    }

    const handleAdd = async () => {
        if (milk) {
            const milResponse = await addCalorie("milk", milk)
            if (!response) return;
        }

        if (chapati) {
            const chapatiResponse = await addCalorie("chapati", chapati)
            if(!chapatiResponse) return;
        }

        if (egg) {
            const eggResponse = await addCalorie("eggs", egg)
            if (!eggResponse) return;
        }

        if (curry) {
            const curryResponse = await addCalorie('curry', curry);
            if (!curryResponse) return;
        }

        if (rice) {
            const riceResponse = await addCalorie('rice', rice);
            if(!riceResponse) return;
        }
        
        if(bread) {
            const breadResponse = await addCalorie('bread', bread);
            if (!breadResponse) return;
        }
    }


    useEffect(()=>{
        const getCaloreConsumed = async () => {
            const response = await getCalorie();
            if (!response) {
                setCalories(0)
            }

            setCalories(response);
            checkZone(response)
        }

        getCaloreConsumed();
    }, [])

    return (
        <div className="flex flex-col text-xl">
            <div
                onClick={()=>setSelected()}
                className="curosr-pointer"
            >
                back
            </div>

            <div className="flex flex-col gap-2 pt-4">
                <section>
                    <span className={`text-3xl border-b-2 ${zone === "Safe" ? 'border-green-300' : zone === "Alert" ? "border-orange-300" : "border-red-300"}`}>{zone}</span>
                    <p className="mt-4">{`you are on ${zone} side of caffiene consumption`}</p>
                </section>

                <section className="flex justify-between pr-20 text-3xl mt-10">
                    <div className="flex flex-col gap-1">
                        <span>{calories}</span>
                        <span className="text-base">consumed</span>
                    </div>
                    <div>
                        2000
                    </div>
                </section>

                <section className="flex gap-28 mt-14">
                    <div className="flex gap-2">
                        <div 
                            className="flex justify-center items-center text-md   gap-2 relative"
                            onClick={()=>{setMilk(prev => prev + 1)}}
                        >
                            <span>
                                <img
                                    className="h-20"
                                    src="/milk.png"
                                />
                            </span>
                            { milk > 0 && <span className="text-base absolute -bottom-8">{milk}</span>}
                        </div>
                        <div 
                            className="flex flex-col justify-center items-center text-md relative gap-2 "
                            onClick={()=>{setEgg(prev => prev + 1)}}
                        >
                            <img
                                className="h-20"
                                src="/eggs.png"
                            />
                            { egg > 0 && <span className="text-base absolute -bottom-8">{egg}</span>}
                        </div>

                        <div 
                            className="flex justify-center items-center text-md   gap-2 relative"
                            onClick={()=>{setBread(prev => prev + 1)}}
                        >
                            <img
                                className="h-20"
                                src="/bread.png"
                            />
                            { bread > 0 && <span className="text-base absolute -bottom-8">{bread}</span>}
                        </div>

                        <div 
                            className="flex justify-center items-center text-md   gap-2 relative"
                            onClick={()=>{setChapati(prev => prev + 1)}}
                        >
                            <img
                                className="h-20"
                                src="/chapati.png"
                            />
                            { chapati > 0 && <span className="text-base absolute -bottom-8">{chapati}</span>}
                        </div>

                        <div 
                            className="flex justify-center items-center text-md   gap-2 relative"
                            onClick={()=>{setRice(prev => prev + 1)}}
                        >
                            <img
                                className="h-20" 
                                src="/rice.png"
                            />
                            { rice> 0 && <span className="text-base absolute -bottom-8">{rice}</span>}
                        </div>

                        <div 
                            className="flex justify-center items-center text-md   gap-2 relative"
                            onClick={()=>{setCurry(prev => prev + 1)}}
                        >
                            <img
                                className="h-20"
                                src="/curry.png"
                            />
                            { curry > 0 && <span className="text-base absolute -bottom-8">{curry}</span>}
                        </div>
                        
                    </div>

                    <button
                        onClick={handleAdd}
                    >
                        ADD
                    </button>
                </section>
            </div>
        </div>
    )
}