
import { Button } from "@genaipg/components/Button/Button";
import ArrowBackIos  from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos  from "@mui/icons-material/ArrowForwardIos";
import Download  from "@mui/icons-material/Download";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import useWorkFlowItems from "@genaipg/hooks/useWorkFlowItems";
import style from './style.module.css';

interface Props {
    onExport: () => void;
}

export function BottomMenu({onExport} : Props) {
    const { pathname } = useLocation();
    const { items } = useWorkFlowItems();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNext = () => {
        if (pathname.includes('profile')) {
            navigate('/create/editor/clues');
        } else if (pathname.includes('clues')) {
            navigate('/create/editor/preview');
        }
    }

    const handlePrevious = () => {
        if (pathname.includes('preview')) {
            navigate('/create/editor/clues');
        } else if (pathname.includes('clues')) {
            navigate('/create/editor/profile');
        }
    } 

    return (
        <div className={style.bottomMenu}>
            <Button
                variant="contained"
                onClick={handlePrevious}
            >
                <ArrowBackIos />
                {t('create.buttons.previous')}
            </Button>
            <Button
                variant="contained"
                sx = {pathname.includes('preview') ? {background: 'var(--secondary)'} : {}}
                disabled={pathname.includes('preview') && items[2].status === 'available'}
                onClick={ !pathname.includes('preview') ? handleNext : onExport}
            >
                {!pathname.includes('preview') ? (
                    <>
                        {t('create.buttons.next')}
                        <ArrowForwardIos/>
                    </>
                ) : (
                    <>
                        {t('create.buttons.export')}
                        <Download/>
                    </>
                )}
            </Button>
        </div>
    );
}