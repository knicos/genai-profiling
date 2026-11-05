import { getImage } from "@genaipg/services/images/images";
import { useTranslation } from "react-i18next";
import CommentRow from "./CommentRow";
import style from './style.module.css';

interface Props {
    url?: string;
    profilePicUrl?: string;
    comment?: string;
}

const comments = [
    {
        y: -975.04,
        avatarColor: "var(--palePurple)",
        heartY: -955.04,
        usernameY: -1685,
        commentY: -1647,
        timeY: -1682,
    },
    {
        y: -844.382,
        avatarColor: "var(--primary-verydark)",
        usernameY: -1557.5,
        heartY: -824.544,
        commentY: -1523.93,
        timeY: -1558.002,
    },
    {
        y: -713.04,
        avatarColor: "var(--light-element)",
        heartY: -694.04,
        usernameY: -1422.5,
        commentY: -1387,
        timeY: -1422,
    },
    {
        y: -582.382,
        avatarColor: "var(--info)",
        usernameY: -1284,
        heartY: -564,
        commentY: -1200,
        timeY: -1286,
    },
];

export default function Commented({ url, profilePicUrl, comment }: Props) {
    const { t } = useTranslation();



    return (
        <div className={style.templateWrapper}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 640 1300"
            >
                <g transform="translate(1977.028 1713.112)">
                    <foreignObject
                        width={640}
                        height={675}
                        x={-1975}
                        y={-1743.112}
                    >
                        <div
                            className={style.imageWrapper}
                            style={{
                                backgroundColor: url
                                    ? "transparent"
                                    : "var(--bg-dark3)",
                            }}
                        >
                            {url && <img
                                src={getImage(url)}
                                className={style.image}
                                style={{
                                    objectFit: "contain",
                                }}
                            />}
                        </div>
                    </foreignObject>
                    <rect
                        width={640}
                        height={568}
                        x={-1975.753}
                        y={-1119.486}
                        ry={36.568}
                        className={style.actionOutlined}
                        style={{
                            fill: "#fff",
                            strokeWidth: 2,
                            stroke: "var(--border-grey)",
                        }}
                    />
                    <ellipse
                        cx={-1391.085}
                        cy={-1078.689}
                        rx={28.156}
                        ry={25.012}
                        className={style.actionOutlined}
                        style={{
                            fill: "white",
                            stroke: "none",
                        }}
                    />
                    <path
                        d="m-1401.034-1088.134 19.899 18.889"
                        className={style.closeIcon}
                    />
                    <path
                        d="m-1381.135-1088.134-19.899 18.889"
                        className={style.closeIcon}
                    />
                    <text
                        xmlSpace="preserve"
                        className={style.comment}
                        transform="translate(-1841.906 -1699.003)"
                    >
                        <tspan x={113.096} y={632.575}>
                            <tspan
                                style={{
                                    fill: "#000",
                                }}
                            >
                                {`${t("create.clues.templates.comments.comments")}`}
                            </tspan>
                        </tspan>
                    </text>
                    <path
                        d="M-1975.753-1035.262h640"
                        style={{
                            fill: "#e6e6e6",
                            fillOpacity: 1,
                            stroke: "#e6e6e6",
                            strokeWidth: 2.55,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />

                    {comments.map((item, index) => (
                        <CommentRow
                            key={index}
                            username={t(`create.clues.templates.comments.comment${index}.username`)}
                            comment={t(`create.clues.templates.comments.comment${index}.comment`)}
                            usernameY={item.usernameY}
                            commentY={item.commentY}
                            heartY={item.heartY}
                            timeY={item.timeY}
                            y={item.y}
                            avatarColor={item.avatarColor}
                        />
                    ))}
                    <foreignObject
                        width={640.391}
                        height={400}
                        x={-1974.674}
                        y={-810}
                        style={{
                            alignContent: 'flex-end'
                        }}
                    >
                        <div className={style.commentWrapper}>
                            <div
                                className={style.profilePicWrapper}
                                style={{
                                    width: 111,
                                    height: 111,
                                    margin: '15px',
                                    backgroundColor: profilePicUrl
                                        ? "transparent"
                                        : "black",
                                }}
                            >
                                {profilePicUrl &&
                                    <img
                                        src={getImage(profilePicUrl)}
                                        className={style.profilePic}
                                    />
                                }
                            </div>
                            <div className={style.comment}>
                                {comment}
                            </div>
                        </div>
                    </foreignObject>
                </g>
            </svg>
        </div>
    )
}