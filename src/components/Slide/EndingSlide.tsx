import { useState } from "react";
import RevealProfile from "./Ending/RevealProfile";
import Timeline from "./Ending/Timeline";
import { EndingStep } from "@genaipg/components/Slide/types";
import { UserTimelineData } from "./Ending/types";

interface Props {
    steps: EndingStep[];
    onChange: (form: number) => void;
    setTimelineData: (data: UserTimelineData[]) => void;
}

export default function EndingSlide({ steps, onChange, setTimelineData }: Props) {
    const [ currentForm, setCurrentForm ] = useState<number | undefined>(steps[0]?.form);
    const step = steps.find((s) => s.form === currentForm)?.id;
    const current = steps.find((s) => s.form === currentForm);
    const next = steps.find((s) => s.id !== current?.id);

    const changeForm = (form: number) => {
        setCurrentForm(form);
        onChange(form);
    }

    switch (step) {
        case "revealProfile":
            return (
                <RevealProfile setStep={() => next && changeForm(next.form)}/>
            );

        case "timeline":
            return (
                <Timeline setStep={() => next && changeForm(next.form)} setTimelineData={setTimelineData}/>
            );

        default:
            return null;
    }
}