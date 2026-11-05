import { getImage } from "@genaipg/services/images/images";
import { video } from "./types";
import VideoRow from "./VideoRow";
import { useTranslation } from "react-i18next";
import style from './style.module.css';

interface Props {
    profilePicUrl?: string;
    checked?: boolean;
    videos?: video[];
    time1?: string;
    time2?: string;
}

export default function WatchHistory({ time1, time2, profilePicUrl, checked, videos }: Props) {
    const { t } = useTranslation();
    const videoRows = [
        {
            x: 850,
            y: checked ? 50 : 0,
        },
        {
            x: 850,
            y: checked ? 225 : 205,
        },
        {
            x: 850,
            y: checked ? 475 : 410,
        },
        {
            x: 850,
            y: checked ? 650 : 605,
        },
        {
            x: 850,
            y: checked ? 825 : 800
        },
    ];

    return (
        <div className={style.templateWrapper}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 640 1300"
            >
                <g transform="translate(2802.143 282.577)">
                    <rect
                        width={640}
                        height={1300}
                        x={-2801.418}
                        y={-270.442}
                        ry={0}
                        style={{
                            fill: "white",
                        }}
                    />
                    <path
                        d="M-2801.418-281.852h639.275v129.434h-639.275z"
                        style={{
                            fill: "var(--border-grey)"
                        }}
                    />
                    <path
                        d="m-2767.311-233.667 51.41-.56M-2767.311-216.855l51.41-.56M-2767.311-200.043l51.41-.56"
                        style={{
                            stroke: "var(--text-dark)",
                            strokeWidth: 6.75,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <foreignObject
                        width={90}
                        height={90}
                        x={-2280}
                        y={-265}
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
                    <text
                        xmlSpace="preserve"
                        className={style.watchHistoryTitle}
                        transform="translate(-2816.835 -286.432)"
                    >
                        <tspan x={46.479} y={212.572}>
                            <tspan
                                style={{
                                    fill: "black",
                                }}
                            >
                                {t("create.clues.templates.watchHistory.watchHistory")}
                            </tspan>
                        </tspan>
                    </text>
                    {checked &&
                        <>
                            <text
                                x={-2775}
                                y={21}
                                fontSize={36}
                                fontWeight={700}
                                textAnchor="start"
                            >
                                <tspan>{time1}</tspan>
                            </text>

                            <text
                                x={-2775}
                                y={455}
                                fontSize={36}
                                fontWeight={700}
                                textAnchor="start"
                            >
                                <tspan>{time2}</tspan>
                            </text>
                        </>
                    }

                    {videos ? (
                        videos.map((item, ix) => (
                            <VideoRow
                                key={ix}
                                x={videoRows[ix].x}
                                y={videoRows[ix].y}
                                video={item}
                            />
                        ))
                    ) : (
                        <VideoRow
                            x={videoRows[0].x}
                            y={videoRows[0].y}
                        />
                    )}
                </g>
            </svg>
        </div >
    )
}