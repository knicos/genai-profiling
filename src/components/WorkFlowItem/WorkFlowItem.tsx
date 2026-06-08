import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface WorkFlowItem{
    id: string;
    status: 'complete' | 'available' | 'blocked'
}

interface Props {
    item: WorkFlowItem;
}

export default function WorkFlowItem({ item } : Props) {
     const { t } = useTranslation();

    return(
        <Button>
            {t(`workflow.${item.id}`)}
        </Button>
    )
}