import { IconButton } from '@mui/material';
import Slide from '../Slide/Slide';
import { SlideMeta } from '../Slide/types';
import style from './style.module.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DownloadIcon from '@mui/icons-material/Download';

interface Props {
    index: number;
    slides: SlideMeta[];
    showControls?: boolean;
    hasNext?: boolean;
    onChange?: (index: number) => void;
    defaultSlide?: JSX.Element;
    onDownload?: () => void;
    onQRCode?: () => void;
}

export default function SlideShow({
    index,
    slides,
    showControls,
    onChange,
    hasNext,
    defaultSlide,
    onDownload,
    onQRCode,
}: Props) {
    return (
        <div className={style.container}>
            {index >= 0 && index < slides.length ? <Slide meta={slides[index]} /> : defaultSlide || null}
            {showControls && (
                <div className={style.controls}>
                    <IconButton
                        size="large"
                        color="inherit"
                        disabled={index === -1}
                        onClick={() => {
                            if (onChange) onChange(index - 1);
                        }}
                    >
                        <NavigateBeforeIcon fontSize="large" />
                    </IconButton>
                    <div className={style.centralButtons}>
                        {onQRCode && (
                            <IconButton
                                color="inherit"
                                onClick={onQRCode}
                            >
                                <QrCode2Icon fontSize="large" />
                            </IconButton>
                        )}
                        {onDownload && (
                            <IconButton
                                color="inherit"
                                onClick={onDownload}
                            >
                                <DownloadIcon fontSize="large" />
                            </IconButton>
                        )}
                    </div>
                    <IconButton
                        size="large"
                        color="inherit"
                        disabled={!hasNext}
                        onClick={() => {
                            if (onChange) onChange(index + 1);
                        }}
                    >
                        <NavigateNextIcon fontSize="large" />
                    </IconButton>
                </div>
            )}
        </div>
    );
}
