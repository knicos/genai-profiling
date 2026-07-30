import { Button } from "@genai-fi/base";
import CollageSlide from "@genaipg/components/Slide/CollageSlide";
import DemoSlide from "@genaipg/components/Slide/DemoSlide";
import { SlideCollage, SlideDemo } from "@genaipg/components/Slide/types";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
    clue?: SlideDemo | SlideCollage;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    doClose: () => void;
}



export default function ClueDialog({ clue, isOpen, setIsOpen, doClose }: Props) {
    const { t } = useTranslation();

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={doClose}
                slotProps={{
                    paper: {
                        sx: {
                            height: '100%'
                        }
                    },
                }}
                maxWidth='lg'
                fullWidth
            >
                <DialogTitle>
                    {t("create.clues.clue")} {clue && clue.type === 'demo' ? clue.clue.id : clue?.id}
                </DialogTitle>
                <DialogContent>
                    {clue?.type === 'demo' && <DemoSlide meta={clue} />}
                    {clue?.type === 'collage' && <CollageSlide />}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setIsOpen(false)}
                    >
                        {t("game.ending.close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}       