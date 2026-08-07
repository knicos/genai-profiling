import { Button } from "@genai-fi/base";
import { icons } from "@genaipg/components/Icons/IconOptions";
import { Dialog, DialogActions, DialogContent, DialogTitle, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import style from './style.module.css';
import { useState } from "react";
import { IconType } from "@genaipg/components/Icons/type";

interface Props {
    icon: IconType;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    save: (icon: IconType) => void;
}

export default function IconsDialog({ isOpen, setIsOpen, icon, save }: Props) {
    const { t } = useTranslation();
    const [selectedIcon, setSelectedIcon] = useState<IconType>(icon);

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                {t("create.profileInformation.chooseIcon")}
            </DialogTitle>
            <DialogContent className={style.iconContent}>
                <ToggleButtonGroup
                    className={style.toggleGroup}
                    exclusive
                    value={selectedIcon}
                    onChange={(_, newValue) => {
                        if (newValue !== null) setSelectedIcon(newValue as IconType);
                    }}
                >
                    {Object.entries(icons).map(([type, Icon]) => (
                        <ToggleButton
                            key={type}
                            value={type}
                            className={style.button}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'var(--light-element)',
                                    color: 'var(--primary)',
                                    '&:hover': {
                                        filter: 'brightness(0.95)',
                                        backgroundColor: 'var(--light-element)',
                                    }
                                },
                            }}
                        >
                            <Icon fontSize="inherit" />
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    onClick={() => setIsOpen(false)}
                >
                    {t("create.buttons.close")}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => save(selectedIcon)}
                >
                    {t("create.buttons.select")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}