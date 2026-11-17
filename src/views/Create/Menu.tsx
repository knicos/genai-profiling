import styles from './style.module.css';
import useWorkFlowItems from "@genaipg/hooks/useWorkFlowItems";
import { useTranslation } from 'react-i18next';
import TaskAlt from "@mui/icons-material/TaskAlt";
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked'
import { Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "react-router";
import { useAtomValue } from 'jotai';
import { featureFlagsAtom } from '@genaipg/state/featureState';
import { Tooltip } from '@mui/material';
import style from './style.module.css';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { useState } from 'react';
import { ReportDialog, Button } from '@genai-fi/base';

export function Menu() {
    const { items } = useWorkFlowItems();
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const { allowReportProblem } = useAtomValue(featureFlagsAtom);
    const [showReportDialog, setShowReportDialog] = useState(false);

    return (
        <div className={styles.header}>
            {items.map((item, ix) => (
                <Fragment key={ix}>
                    <Link
                        to={`${item.id}`}
                        className={`${styles.menuButton} ${pathname.includes(`/${item.id}`) ? styles.selected : ''} ${styles[item.status]}`}
                        style={item.status === 'blocked' ? { pointerEvents: 'none', color: 'gray' } : {}}
                    >
                        {item.status === 'complete' && <TaskAlt htmlColor={pathname.includes(`/${item.id}`) ? "var(--lightSuccess)" : "var(--darkSuccess)"} />}
                        {item.status === 'blocked' && <RadioButtonUnchecked />}
                        {item.status === 'available' && <RadioButtonUnchecked />}
                        <span className={styles.itemText}>{t(`workflow.${item.id}`)}</span>
                    </Link>
                    {0 <= ix && ix < 2 && <div className={styles.bgBar} />}
                </Fragment>
            ))}
            {allowReportProblem && (
                <Tooltip
                    title={t('app.reportProblemTip')}
                    arrow
                    className={style.reportButton}
                >
                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<ReportOutlinedIcon fontSize="small" />}
                        sx={{ fontSize: '0.75rem', marginRight: '1rem' }}
                        onClick={() => setShowReportDialog(true)}
                    >
                        {t('app.reportProblem')}
                    </Button>
                </Tooltip>
            )}
            {allowReportProblem && showReportDialog && (
                <ReportDialog
                    application='pg'
                    apiURL={import.meta.env.VITE_APP_API}
                    open={showReportDialog}
                    onClose={() => setShowReportDialog(false)}
                />
            )}
        </div>
    );
}
