import { getImage } from '@genaipg/services/images/images';
import style from './style.module.css'
import { useTranslation } from 'react-i18next';

interface Props {
    username?: string;
    caption?: string;
    url?: string;
    profilePicUrl?: string;
    checked?: boolean;
}

export default function ShortVideo({ username, caption, url, profilePicUrl, checked }: Props) {
    const { t } = useTranslation();

    return (
        <div className={style.templateWrapper}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 640 1300"
            >
                <g transform="translate(2815.566 1762.112)">
                    <foreignObject
                        width={640}
                        height={1300}
                        x={-2815.566}
                        y={-1750.112}
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
                                        objectFit: "fill",
                                    }}
                                />
                            }
                        </div>
                    </foreignObject>
                    <foreignObject
                        width={111}
                        height={111}
                        x={-2310.125}
                        y={-1175.333}
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
                    <circle
                        cx={-2249.125}
                        cy={-525.333}
                        r={37.036}
                        className={style.darkerElement}
                    />
                    <path
                        d="M-2253.236-943.41s-67.542-46.714-40.262-70.304c23.049-19.931 41.138 7.918 41.138 7.918s17.478-27.145 41.428-9.556c34.196 25.113-42.304 71.942-42.304 71.942z"
                        className={style.actionOutlined}
                        style={{
                            fill: checked ? 'var(--darker-red)' : "#fff",
                            stroke: "none",
                        }}
                    />
                    <path
                        d="M-2249.294-901.879c-2.33.015-3.748.16-3.748.16s-40.638-3.896-40.422 36.319c.213 39.67 54.633 30.142 54.633 30.142l24.824 8.207-3.277-17.603s10.161-12.41 8.43-27.559c-3.126-27.335-30.344-29.729-40.44-29.666zm-19.63 26.54a6.68 7.357 0 0 1 6.68 7.357 6.68 7.357 0 0 1-6.68 7.355 6.68 7.357 0 0 1-6.68-7.355 6.68 7.357 0 0 1 6.68-7.358zm17.864 0a6.68 7.357 0 0 1 6.68 7.357 6.68 7.357 0 0 1-6.68 7.355 6.68 7.357 0 0 1-6.681-7.355 6.68 7.357 0 0 1 6.681-7.358zm17.863 0a6.68 7.357 0 0 1 6.68 7.357 6.68 7.357 0 0 1-6.68 7.355 6.68 7.357 0 0 1-6.68-7.355 6.68 7.357 0 0 1 6.68-7.358z"
                        className={style.actionOutlined}
                        style={{
                            fill: "#fff",
                            stroke: "none",
                        }}
                    />
                    <path
                        d="m-2210.816-667.7-80.488 22.682 31.668 13.686 24.41-18.184c-8.536 6.419-17.073 12.836-24.41 18.184l11.834 33.941z"
                        className={style.actionOutlined}
                        style={{
                            fill: "#fff",
                            stroke: "none",
                        }}
                    />
                    <path
                        d="M-2282.489-785.522v74.2l31.776-18.63 31.081 18.63v-74.2z"
                        className={style.actionOutlined}
                        style={{
                            fill: "#fff",
                            stroke: "none",
                        }}
                    />
                    <foreignObject
                        y={-775}
                        x={-2792}
                        width={350}
                        height={75}
                    >
                        <div
                            className={style.text}
                            style={{
                                fontSize: "42px",
                                fontWeight: 700,
                                color: "#fff",
                            }}
                        >
                            {username ? username :  t("create.clues.templates.username")}
                        </div>
                    </foreignObject>
                    <foreignObject
                        y={-700}
                        x={-2792}
                        width={450}
                        height={110}
                    >
                        <div
                            className={style.captionText}
                        >
                            {caption ? caption : t("create.clues.templates.caption")}
                        </div>
                    </foreignObject>
                    <text
                        xmlSpace="preserve"
                        className={style.text}
                        style={{
                            fontSize: "22px",
                            fontWeight: 400,
                            fill: "#fff",
                        }}
                        transform="translate(-2609.199 -1439.48)"
                    >
                        <tspan x={-133.396} y={919.497}>
                            {t("create.clues.templates.originalAudio")}
                        </tspan>
                    </text>
                    <path
                        d="M-2752.56-538.805h22.416M-2752.56-538.805Z"
                        className={style.noteIcon}
                        style={{
                            stroke: "none",
                        }}
                    />
                    <path
                        d="m-2771.472-540.64-11.207 2.944-.3 19.646"
                        className={style.noteIcon}
                        style={{
                            fill: "none",
                        }}
                    />
                    <ellipse
                        cx={-2299.981}
                        cy={-1638.475}
                        rx={4.709}
                        ry={2.975}
                        className={style.noteIcon}
                        transform="matrix(.9078 -.41942 .42699 .90426 0 0)"
                    />
                    <ellipse
                        cx={-2278.968}
                        cy={-1633.205}
                        rx={4.709}
                        ry={2.975}
                        className={style.noteIcon}
                        transform="matrix(.9078 -.41942 .42699 .90426 0 0)"
                    />
                    <path
                        d="m-2777.076-539.168 15.673-3.984-.299 21.054"
                        className={style.noteIcon}
                        style={{
                            fill: "none",
                        }}
                    />
                    <path
                        d="m-2781.025-538.13 17.989-4.607"
                        className={style.noteIcon}
                        style={{
                            fill: "none",
                            strokeWidth: 6.372,
                        }}
                    />
                    <path
                        d="M-2282.41-537.19s8.415-25.61 36.516-22.777l4.051 29.468s-14.129 2.84-16.954 7.496zM-2217.115-510.914s-10.316 23.257-37.055 20.599l-.989-30.452s8.83.482 12.263-3.746z"
                        className={style.noteIcon}
                        style={{
                            fill: "black",
                            stroke: "none",
                        }}
                    />
                    <circle
                        cx={-2249.125}
                        cy={-525.333}
                        r={14.686}
                        className={style.closeIcon}
                        style={{
                            fill: "var(--bg-light)",
                            stroke: "none",
                        }}
                    />
                    <ellipse
                        cx={-2249.125}
                        cy={-525.333}
                        rx={3.729}
                        ry={3.745}
                        className={style.closeIcon}
                        style={{
                            fill: "black",
                            stroke: "none",
                        }}
                    />
                </g>
            </svg>
        </div>
    )
}