import style from './style.module.css';
import { useState } from 'react';
import IconsDialog from '@genaipg/views/dialogs/IconsDialog/IconsDialog';
import { IconType } from '../Icons/type';
import Icon from '../Icons/Icon';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';

interface Props {
    label: string;
    icon: IconType;
    updateIcon: (icon: IconType) => void;
    normal?: boolean;
}

export default function IconPicker({ label, icon, updateIcon, normal }: Props) {
    const { t } = useTranslation();
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const onSave = (icon: IconType) => {
        updateIcon(icon);
        setOpenDialog(false);
    }


    return (
        <fieldset style={{ border: 0, padding: 0, marginBottom: '1rem', width: '100%' }}>
            <legend 
                className={style.fieldLabel}
                style={{ 
                    fontWeight: normal ? 'normal' : 'bold' 
                }}
            >
                {label}
            </legend>
            <div className={style.pickerContainer}>
                <span className={style.icon}>
                    <Icon icon={icon} />
                </span>
                <Button
                    variant='contained'
                    className={style.iconPicker}
                    onClick={() => setOpenDialog(!openDialog)}
                >
                    {t("create.profileInformation.changeIcon")}
                </Button>
            </div>
            <IconsDialog isOpen={openDialog} setIsOpen={setOpenDialog} icon={icon} save={onSave} />
        </fieldset>
    )
}