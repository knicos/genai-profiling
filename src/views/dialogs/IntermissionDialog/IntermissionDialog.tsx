import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import Intermission from "@genaipg/views/dialogs/IntermissionDialog/Intermission";
import style from './style.module.css';

interface Props {
    formIndex: number;
    onDone: (state: boolean) => void;
    isOpen: boolean;
}

export default function IntermissionDialog({ formIndex, onDone, isOpen }: Props) {
    const { t } = useTranslation();

    return (
        <>
            <Dialog
                open={isOpen}
                maxWidth="md"
            >
                <DialogTitle>
                    {t("student.intermission.title")}
                </DialogTitle>
                <DialogContent className={style.content}>
                    <Intermission 
                        formIndex={formIndex}
                        onDone={onDone}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}