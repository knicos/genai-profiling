import { useTranslation } from 'react-i18next';
import style from './style.module.css';

interface Props {
    username: string;
    usernameY: number;
    commentY: number;
    heartY: number;
    timeY: number;
    comment: string;
    y: number;
    avatarColor: string;
}

export default function CommentRow({ username, comment, y, usernameY, commentY, heartY, timeY, avatarColor, }: Props) {
    const { t } = useTranslation();
    
    return (
        <g>
            <circle
                cx={-1904.51}
                cy={y}
                r={39.037}
                style={{
                    fill: avatarColor
                }}
            />

            <ellipse
                cx={-1903.572}
                cy={y - 11.608}
                rx={13.672}
                ry={13.898}
                style={{
                    fill: "white",
                }}
            />

            <path
                d={`M-1933.039 ${y + 21.902}
                s6.039-16.397 29.467-16.397
                v31.741
                s-18.822.738-29.467-15.344z`}
                style={{
                    fill: "white"
                }}
            />

            <path
                d={`M-1876.105 ${y + 21.902}
                s-6.038-16.397-29.467-16.397
                v31.741
                s18.822.738 29.467-15.344z`}
                style={{
                    fill: "white"
                }}
            />

            <text
                xmlSpace="preserve"
                className={style.commentUsername}
                style={{
                    fontWeight: 700,
                    fill: "var(--text-dark)",
                }}
                transform={`translate(-1955.794 ${usernameY})`}
            >
                <tspan x={109.361} y={705.319}>
                    {username}
                </tspan>
            </text>

            <text
                xmlSpace="preserve"
                className={style.commentUsername}
                style={{
                    fill: "var(--text-dark)",
                }}
                transform={`translate(-1955.794 ${commentY})`}
            >
                <tspan x={109.361} y={705.319}>
                    {comment}
                </tspan>
            </text>

            <text
                xmlSpace="preserve"
                className={style.commentUsername}
                style={{
                    fill: "var(--bg-dark)",
                }}
                transform={`translate(-1773.945 ${timeY})`}
            >
                <tspan x={109.361} y={705.319}>
                    {t(`create.clues.templates.comments.time`)}
                </tspan>
            </text>

            <path
                d={`
                M-1394.117 ${heartY}
                s-33.507-22.994-19.974-34.606
                c11.435-9.811 20.408 3.897 20.408 3.897
                s8.671-13.361 20.553-4.704
                c16.964 12.362-20.987 35.413-20.987 35.413z
            `}
                className={style.actionOutlined}
                style={{
                    stroke: "var(--text-dark)",
                    fill: "none"
                }}
            />
        </g>
    );
}

