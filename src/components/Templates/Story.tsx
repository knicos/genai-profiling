import { getImage } from "@genaipg/services/images/images";
import { useTranslation } from "react-i18next";
import style from './style.module.css';

interface Props {
    url?: string;
    profilePicUrl?: string;
    username?: string;
}

export default function Story({ url, profilePicUrl, username }: Props) {
    const { t } = useTranslation();
    
    return (
        <div className={style.templateWrapper}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 640 1300"
            >
                <g transform="translate(1991.265 -1262.205)">
                    <rect
                        width={640}
                        height={1310.328}
                        x={-1991.265}
                        y={1262.205}
                        ry={0}
                        className={style.darkerElement}
                    />
                    <foreignObject
                        width={640}
                        height={1159.022}
                        x={-1991.265}
                        y={1291.596}
                    >
                        <div
                            className={style.imageWrapper}
                            style={{
                                backgroundColor: url
                                    ? "transparent"
                                    : "var(--bg-dark3)",
                            }}
                        >
                            {url &&
                                <img
                                    src={getImage(url)}
                                    className={style.image}
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            }
                        </div>
                    </foreignObject>
                    <rect
                        width={190.173}
                        height={12.083}
                        x={-1770.118}
                        y={1321.271}
                        ry={6.041}
                        className={style.storyTimeline}
                    />
                    <rect
                        width={190.173}
                        height={12.083}
                        x={-1568.404}
                        y={1321.271}
                        ry={6.041}
                        className={style.storyTimeline}
                    />
                    <rect
                        width={190.173}
                        height={12.083}
                        x={-1971.833}
                        y={1321.271}
                        ry={6.041}
                        className={style.storyTimeline}
                        style={{
                            fill: "white",
                        }}
                    />
                    <rect
                        width={115.67}
                        height={12.083}
                        x={-1770.118}
                        y={1321.271}
                        ry={6.041}
                        className={style.storyTimeline}
                        style={{
                            fill: "white",
                        }}
                    />
                    <foreignObject
                        width={111}
                        height={111}
                        x={-1965}
                        y={1350}
                    >
                        <div
                            className={style.profilePicWrapper}
                            style={{
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
                    </foreignObject>
                    <foreignObject
                        y={1373}
                        x={-1840}
                        width={350}
                        height={60}
                    >
                        <div
                            className={style.text}
                            style={{
                                fontSize: "42px",
                                color: "white",
                                fontWeight: 700,
                            }}
                        >
                            {username ? username : t('create.clues.templates.username')}
                        </div>
                    </foreignObject>
                    <rect
                        width={417.366}
                        height={50.844}
                        x={-1961.667}
                        y={2480.384}
                        ry={25.422}
                        className={style.actionOutlined}
                        style={{
                            stroke: "white",
                        }}
                    />
                    <path
                        d="M-1491.7 2529.774s-41.474-28.82-24.723-43.375c14.153-12.297 25.26 4.885 25.26 4.885s10.733-16.747 25.44-5.896c20.997 15.494-25.977 44.386-25.977 44.386z"
                        className={style.actionOutlined}
                        style={{
                            stroke: "white",
                        }}
                    />
                    <path
                        d="m-1414.94 2504.193 33.415-24.774-55.091 15.451z"
                        className={style.actionOutlined}
                        style={{
                            stroke: "white",
                        }}
                    />
                    <path
                        d="M-1414.94 2504.193c10.043-7.286 23.371-17.489 33.415-24.774l-25.315 47.894z"
                        className={style.actionOutlined}
                        style={{
                            stroke: "white",
                        }}
                    />
                </g>
            </svg>
        </div>
    )
}