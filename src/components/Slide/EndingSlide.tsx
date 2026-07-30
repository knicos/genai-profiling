import { useState } from "react"
import RevealProfile from "./Ending/RevealProfile";
import Timeline from "./Ending/Timeline";

export default function EndingSlide() {
    const [ step, setStep ] = useState<number>(0);
    
    return (
        step === 0 ? (
            <RevealProfile setStep={() => setStep(step + 1)}/>
        ) : (
            <Timeline setStep={() => setStep(step - 1)}/>
        )
    )
}