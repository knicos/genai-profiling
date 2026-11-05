import { getImage } from "@genaipg/services/images/images"
import { video } from "./types";
import style from './style.module.css';
import { useTranslation } from "react-i18next";

interface Props {
    x: number,
    y: number,
    video?: video
}

export default function VideoRow({ x, y, video }: Props) {
    const { t } = useTranslation();

    return (
        <g transform={`translate(${x} ${y})`}>
            <foreignObject
                width={259.385}
                height={158.528}
                x={-3625.981}
                y={13.741}
            >
                <div
                    className={style.imageWrapper}
                    style={{
                        backgroundColor: video?.url
                            ? "transparent"
                            : "gray",
                    }}
                >
                    {video?.url &&
                        <img
                            src={getImage(video.url)}
                            className={style.image}
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    }
                </div>
            </foreignObject>
            <foreignObject
                x={-3350.974}
                y={13.741}
                height={100}
                width={260}
            >
                <div
                    style={{
                        width: '100%',
                        fontSize: 32,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        overflow: 'hidden',
                        overflowWrap: 'anywhere',
                        textAlign: 'start',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}
                >
                    {video?.title ? video?.title : t("create.clues.templates.watchHistory.exampleTitle")}
                </div>
            </foreignObject>
            <foreignObject
                x={-3350.974}
                y={115}
                height={100}
                width={260}
            >
                <div
                    style={{
                        width: '100%',
                        fontSize: 26,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        textAlign: 'start',
                    }}
                >
                    {video?.creator ? video?.creator : t("create.clues.templates.watchHistory.exampleCreator")}
                </div>
            </foreignObject>
            <circle
                cx={-3071.36}
                cy={41.193}
                r={4.318}
                style={{
                    fill: "#2c2c2c",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 1.45,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
            />
            <circle
                cx={-3071.36}
                cy={53.776}
                r={4.318}
                style={{
                    fill: "#2c2c2c",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 1.45,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
            />
            <circle
                cx={-3071.36}
                cy={66.359}
                r={4.318}
                style={{
                    fill: "#2c2c2c",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 1.45,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
            />
            <path
                d="M-3621.469 168.801c88.193 0 169.355.043 251.448.043"
                style={{
                    fill: "none",
                    fillOpacity: 1,
                    stroke: "#939393",
                    strokeWidth: 6.85,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
            />
            <path
                d="M-3622.556 168.801h114.91"
                style={{
                    fill: "none",
                    fillOpacity: 1,
                    stroke: "#008297",
                    strokeWidth: 6.85,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
            />
        </g>
    )
}