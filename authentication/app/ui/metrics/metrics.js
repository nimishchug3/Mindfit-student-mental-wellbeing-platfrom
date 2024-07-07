import { karla } from "@/app/fonts"
import { useState } from "react"
import TrackCalories from "./trackCalories"
import YourEvents from "./yourEvents"
import YourChallenges from "./yourChallenges"
import TrackCaffiene from "./trackCaffiene"

export default function Metric() {

    const [selected, setSelected] = useState(0)

    return (
        <div className="text-slate-200">
            { selected === 0 &&
            
            <div className="p-4 flex flex-col gap-6 justify-center pt-10 mt-10 pr-28">
                <div 
                    className={`${karla.className} text-3xl border-b pb-2 chat-hover relative cursor-pointer`}
                    onClick={()=>{setSelected(1)}}
                >
                    <span>Your Events</span>
                </div>
                <div 
                    className={`${karla.className} text-3xl border-b pb-2 chat-hover relative cursor-pointer`}
                    onClick={()=>{setSelected(2)}}
                >
                    <span>Your Challenges</span>
                </div>
                <div 
                    className={`${karla.className} text-3xl border-b pb-2 chat-hover relative cursor-pointer`}
                    onClick={()=>{setSelected(3)}}
                >
                    <span>Track caffiene</span>
                </div>
                <div 
                    className={`${karla.className} text-3xl border-b pb-2 chat-hover relative cursor-pointer`}
                    onClick={()=>{setSelected(4)}}
                >
                    <span>Track Calories</span>
                </div>
            </div>}

            { selected === 1 && <YourEvents setSelected={()=>{setSelected(0)}}/>}
            { selected === 2 && <YourChallenges setSelected={()=>{setSelected(0)}}/>}
            { selected === 3 && <TrackCaffiene setSelected={()=>{setSelected(0)}}/>}
            { selected === 4 && <TrackCalories setSelected={()=>{setSelected(0)}}/>}
        </div>
      
    )
}