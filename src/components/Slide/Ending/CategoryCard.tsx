import { popularCategory } from "@genaipg/views/Teacher/userState";
import style from './style.module.css'
import { Box, List } from "@mui/material";
import { IconButton } from "@genaipg/components/Button/IconButton";
import ImageIcon from '@mui/icons-material/Image';
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import { useTranslation } from "react-i18next";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LoadingBar from "@genaipg/components/ProgressBar/LoadingBar";
import QuestionResult from "../../Question/QuestionResult";


interface Props {
    category?: popularCategory;
    currentIndex: number;
    revealedCategories: number;
    totalCategories: number;
    revealed: boolean;
    changeCategory: (index: number) => void;
}

export default function CategoryCard({ category, currentIndex, revealedCategories, totalCategories, revealed, changeCategory }: Props) {
    const { t } = useTranslation()

    return (
        <Box className={style.profileCard}>
            <Box className={`${style.revealingOverlay} ${revealed ? style.visible : ''}`}>
                <span className={`${style.categoryIcon} ${style.large}`}>
                    <PersonSearchIcon fontSize="inherit" />
                </span>
                <h2>
                    {t("game.ending.calculating")}
                </h2>
                <LoadingBar index={revealedCategories} total={totalCategories} />
            </Box>

            {category ? (
                <Box className={style.categoryContent}>
                    <Box
                        className={style.categoryTop}
                    >
                        <div
                            className={style.categoryTitle}
                            style={{ margin: '0.75rem' }}
                        >
                            <span className={style.categoryIcon}>
                                <ImageIcon fontSize="inherit" />
                            </span>
                            <h2>
                                {category.label}
                            </h2>
                        </div>
                        <div className={style.iconButtonGroup}>
                            <IconButton
                                aria-label={t("create.buttons.previous")}
                                className={style.iconButton}
                                onClick={() => changeCategory(currentIndex - 1)}
                                disabled={currentIndex <= 0}
                            >
                                <ChevronLeft />
                            </IconButton>
                            <IconButton
                                aria-label={t("create.buttons.next")}
                                className={style.iconButton}
                                onClick={() => changeCategory(currentIndex + 1)}
                                disabled={currentIndex === totalCategories - 1}
                            >
                                <ChevronRight />
                            </IconButton>
                        </div>
                    </Box>
                    <List className={style.categoryList}>
                        {category.questions.map((question, ix) => (
                            <QuestionResult 
                                key={ix} 
                                question={question} 
                                revealed={revealedCategories === totalCategories} 
                            />
                        ))}
                    </List>
                </Box>
            ) :
                (
                    <Box className={style.noCategory}>
                        <ViewListRoundedIcon fontSize="inherit" htmlColor="var(--primary-dark)" />
                        <h2>
                            {t('game.ending.noCategory')}
                        </h2>
                    </Box>
                )}
        </Box>
    )

}