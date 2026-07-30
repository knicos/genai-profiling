import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { profileAtom } from '@genaipg/state/profileState';
import { Box, List } from '@mui/material';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import CategorySection from './CategorySection';
import { getCorrectAnswers, popularCategory } from '@genaipg/views/Teacher/userState';
import { useMemo, useState } from 'react';
import CategoryCard from './CategoryCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MockProfile from '@genaipg/components/Visuals/MockProfile';

interface Props {
    setStep: () => void;
}

export default function RevealProfile({ setStep }: Props) {
    const { t } = useTranslation();
    const profile = useAtomValue(profileAtom);

    const [currentCategory, setCurrentCategory] = useState<popularCategory>();
    const [revealedCount, setRevealedCount] = useState(0);
    const [revealing, setRevealing] = useState(false);


    const categories = useMemo(() => {
        if (!profile) return [];
        return getCorrectAnswers(profile.questions.questions);
    }, [profile]);

    const correctCount = useMemo(() => {
        return categories
            .slice(0, revealedCount)
            .filter(category => category.isCorrect === 'correct')
            .length;
    }, [categories, revealedCount]);

    const currentIndex = currentCategory
        ? categories.findIndex(c => c.id === currentCategory.id)
        : -1;

    const startReveal = () => {
        if (revealing) return;

        setRevealing(true);
        setRevealedCount(0);

        const delay = 800;

        categories.forEach((_, i) => {
            setTimeout(() => {
                setRevealedCount(i + 1);
            }, i * delay);
        });

        setTimeout(() => {
            setRevealing(false);
        }, categories.length * delay);
    };

    let categoryIndex = 0;

    const changeCategory = (index: number) => {
        setCurrentCategory(categories[index]);
    }

    return (
        <Box className={style.container}>
            <h1>
                {!revealing && revealedCount === 0
                    ? t("game.ending.popularTitle")
                    : `${correctCount} / ${categories.length} ${t("game.ending.correctTitle")}`
                }
            </h1>
            <div className={style.innerContainer}>
                <div className={`${style.profileCard}`}>
                    <MockProfile />
                    <List className={style.categoryList}>
                        {categories.map((category) => {
                            const currentIndex = categoryIndex++;

                            return (
                                <CategorySection
                                    key={category.id}
                                    category={category}
                                    setOpen={setCurrentCategory}
                                    revealed={
                                        currentIndex < revealedCount
                                    }
                                />
                            );
                        })}
                    </List>
                </div>
                <CategoryCard
                    category={currentCategory}
                    currentIndex={currentIndex}
                    revealedCategories={revealedCount}
                    totalCategories={categories.length}
                    revealed={revealing}
                    changeCategory={changeCategory}
                />
            </div>
            <div className={style.buttonGroup}>
                 <Button
                    variant="outlined"
                    className={style.revealButton}
                    disabled={true}
                    startIcon={<ArrowBackIosNewIcon fontSize="inherit"/>}
                >
                    {t("create.buttons.previous")}
                </Button>
                <Button
                    variant="contained"
                    className={style.revealButton}
                    startIcon={<SearchIcon fontSize='inherit'/>}
                    onClick={startReveal}
                    disabled={revealing || revealedCount === categories.length}
                >
                    {t("game.ending.revealButton")}
                </Button>
                <Button
                    variant='outlined'
                    className={style.revealButton}
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={setStep}
                >
                    {t("create.buttons.next")}
                </Button>
            </div>
        </Box>
    );
}