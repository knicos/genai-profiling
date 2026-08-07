import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./style.module.css";
import SliderField from "@genaipg/components/FormFields/SliderField";
import { Button } from "@genai-fi/base";
import { updateIntermissionAtom } from "@genaipg/state/intermissionState";
import { useSetAtom } from "jotai";

interface Props {
    formIndex: number;
    onDone: (state: boolean) => void;
}

export default function Intermission({ onDone, formIndex }: Props) {
    const { t } = useTranslation();
    const updateIntermission = useSetAtom(updateIntermissionAtom);
    const [value, setValue] = useState("50");
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitResponse = useCallback(() => {
        if (submitting) return;

        setSubmitting(true);
        updateIntermission({id: formIndex, value: String(value)});
        onDone(true);
    }, [formIndex, updateIntermission, value, onDone, submitting]);

    return (
        <div className={style.container}>
            <SliderField
                label={t("game.checkpoint.studentQuestion")}
                value={value}
                onChange={(v) => setValue(v)}
                min={0}
                max={100}
            />
            <Button
                variant="contained"
                onClick={submitResponse}
                disabled={submitting}
                fullWidth
            >
                {t('done')}
            </Button>
        </div>
    );
}