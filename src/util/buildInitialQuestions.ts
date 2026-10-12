import { TFunction } from "i18next";
import { Category } from "@genaipg/components/Question/types";
import { randomId } from "@genai-fi/base";

export function buildInitialQuestions(t: TFunction): Category[] {  
    return [
        {
            id: randomId(),
            category: t(
                'create.profileInformation.age.category'
            ),
            icon: 'birthday',
            questions: [
                {
                    id: randomId(),
                    type: 'slider',
                    min: 0,
                    max: 100,   
                    text: t('create.profileInformation.age.templateQuestion'),
                    correct: 18,
                }
            ]
        },
        {
            id: randomId(),
            category: t(
                'create.profileInformation.interests.category'
            ),
            icon: 'love',
            questions: [
                {
                    id: randomId(),
                    type: 'multichoice',
                    text: t(
                        'create.profileInformation.interests.templateQuestion'
                    ),
                    correct: [
                        t(
                            'create.profileInformation.interests.options.0'
                        ),
                        t(
                            'create.profileInformation.interests.options.2'
                        )
                    ],
                    options: t(
                        'create.profileInformation.interests.options',
                        { returnObjects: true }
                    ) as string[]
                }
            ]
        },
        {
            id: randomId(),
            category: t(
                'create.profileInformation.location.category'
            ),
            icon: 'location',
            questions: [
                {
                    id: randomId(),
                    type: 'singlechoice',
                    text: t(
                        'create.profileInformation.location.templateQuestion'
                    ),
                    correct: t('create.profileInformation.location.options.2'),
                    options: t(
                        'create.profileInformation.location.options',
                        { returnObjects: true }
                    )   as string[]
                }
            ]
        },
        {
            id: randomId(),
            icon: 'sports',
            category: t(
                'create.profileInformation.hobbies.category'
            ),
            questions: [

            ]
        }
    ]
}