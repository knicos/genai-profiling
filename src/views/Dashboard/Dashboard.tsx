import { Container, Grid, Tooltip, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from './style.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PreviewIcon from '@mui/icons-material/Preview';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useTranslation } from 'react-i18next';

export default function TeacherDashboard() {
    const { t } = useTranslation();
    return (
        <Container>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    className={styles.upperRow}
                >
                    <div className={styles.imageContainer}>
                        {/* Previous and Next Buttons */}
                        <IconButton className={styles.prevButton}>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <div className={styles.imageSlider}>
                            <img
                                src="public\375d6b43-7c39-4d4b-8370-c0edbd0e25b0.jpg"
                                alt="Image"
                                className={styles.image}
                            />
                        </div>
                        <IconButton className={styles.nextButton}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={12}
                    className={styles.lowerRow}
                >
                    <Grid
                        container
                        justifyContent="center"
                    >
                        <Grid
                            item
                            xs={1}
                        >
                            <Tooltip title={t('Download')}>
                                <IconButton>
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                        >
                            <Tooltip title={t('Enable audio')}>
                                <IconButton>
                                    <VolumeUpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                        >
                            <Tooltip title={t('Enable questions for this profile')}>
                                <IconButton>
                                    <AssignmentIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                        >
                            <Tooltip title={t('Upload session data on server')}>
                                <IconButton>
                                    <UploadIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                        >
                            <Tooltip title={t("View clusters")}>
                                <IconButton>
                                    <PreviewIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                        >
                            <Tooltip title={t("Enable post session feedack questions")}>
                                <IconButton>
                                    <FeedbackIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
