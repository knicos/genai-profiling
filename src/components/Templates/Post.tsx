import { getImage } from "@genaipg/services/images/images";
import { useTranslation } from "react-i18next";
import style from './style.module.css';

interface Props {
    url?: string;
    profilePicUrl?: string;
    checked?: boolean;
    username?: string;
    caption?: string;
}

export default function Post({ url, profilePicUrl, checked, username, caption }: Props) {
    const { t } = useTranslation();

    return (
        <div className={style.templateWrapper}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 640 1300"
            >
                <g transform="translate(1991.265 283.79)">
                    <rect
                        width={640}
                        height={1300}
                        x={-1991.265}
                        y={-283.79}
                        ry={0}
                        style={{
                            fill: "white",
                        }}
                    />
                    <foreignObject
                        width={640}
                        height={642.164}
                        x={-1991.265}
                        y={-126.247}
                    >
                        <div
                            className={style.imageWrapper}
                            style={{
                                background: url ? 'none' : 'var(--bg-dark3)'
                            }}
                        >
                            { url &&
                                <img
                                    src={getImage(url)}
                                    className={style.image}
                                    style={{
                                        objectFit: "contain",
                                    }}
                                />
                            }
                        </div>
                    </foreignObject>
                    <foreignObject
                        width={111}
                        height={111}
                        x={-1955}
                        y={-255}
                    >
                        <div
                            className={style.profilePicWrapper}
                            style={{
                                backgroundColor: profilePicUrl
                                        ? "transparent"
                                        : "black",
                            }}
                        >
                            { profilePicUrl &&
                                <img
                                    src={getImage(profilePicUrl)}
                                    className={style.profilePic}
                                />
                            }
                        </div>
                    </foreignObject>
                    <foreignObject
                        x={-1825}
                        y={-225}
                        width={350}
                        height={50}
                    >
                        <div
                            className={style.text}
                            style={{
                                fontWeight: 700,
                            }}
                        >
                            {username ? username : t("create.clues.templates.username")}
                        </div>
                    </foreignObject>
                    <foreignObject
                        x={-1960}
                        y={630}
                        width={575}
                        height={350}
                    >
                        <div
                            className={style.text}
                            style={{
                                whiteSpace: "break-spaces",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "black",
                                }}
                            >
                                {username}
                            </span>
                            {" "}
                            <span>
                                {caption}
                            </span>
                        </div>
                    </foreignObject>
                    <text
                        xmlSpace="preserve"
                        transform="translate(-1623.396 -345.815)"
                    >
                        <tspan x={194.117} y={153.17}>
                            <tspan
                                style={{
                                    fontSize: "36px",
                                    fontWeight: 700,
                                    fontFamily: "Andika",
                                    fill: "#000",
                                }}
                            >
                                {"..."}
                            </tspan>
                        </tspan>
                    </text>
                    <g transform="translate(-1664.5 570.5) scale(1.3) translate(1664.5 -558.5)">
                        <path
                            d="M-1865.074 580.05s-36.582-25.126-21.807-37.815c12.484-10.721 22.28 4.258 22.28 4.258s9.468-14.6 22.44-5.14c18.52 13.509-22.913 38.698-22.913 38.698z"
                            className={style.actionOutlined}
                            style={{
                                fill: checked ? 'var(--darker-red)' : 'none',
                                stroke: checked ? 'var(--darker-red)' : 'black',
                            }}
                        />
                        <path
                            d="m-1729.931 560.506 29.803-21.844-49.136 13.624z"
                            className={style.actionOutlined}
                        />
                        <path
                            d="M-1729.931 560.506c8.958-6.424 20.845-15.42 29.803-21.844l-22.579 42.23z"
                            className={style.actionOutlined}
                        />
                        <path
                            d="M-1785.64 576.065s-31.503 5.515-31.626-17.45c-.125-23.28 23.4-21.025 23.4-21.025s23.353-2.394 25.58 17.082c1.002 8.77-4.88 15.953-4.88 15.953l1.897 10.19z"
                            className={style.actionOutlined}
                        />
                        <path
                            d="M-1495.992 535.79v44.53l19.07-11.18 18.653 11.18v-44.53Z"
                            className={style.actionOutlined}
                        />
                    </g>
                </g>
            </svg>
        </div>
    )
}