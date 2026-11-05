import style from './style.module.css';

interface Props {
    searches?: string[];
}

const ROW_OFFSETS = [
    { textTranslateY: -13.5, circleY: 67.931, historyY: 61.116, xY: 65.816, dividerY: 75.055 },
    { textTranslateY: 1.5, circleY: 82.906, historyY: 76.091, xY: 80.79, dividerY: 90.03 },
    { textTranslateY: 16.5, circleY: 97.97, historyY: 91.156, xY: 95.855, dividerY: 105.095 },
    { textTranslateY: 32, circleY: 113.668, historyY: 106.853, xY: 111.553, dividerY: null },
];

const HISTORY_PATH = "M-126.716 318.436c-6.013-.33-12.907-1.711-18.424-3.692-3.175-1.14-9.482-4.224-12.356-6.04-6.65-4.204-12.649-9.77-17.43-16.171-6.014-8.053-10.377-18.497-11.792-28.228a279.715 279.715 0 0 0-.412-2.763l-.09-.552h12.793l.245 1.557c2.526 16.01 12.937 30.29 27.47 37.68 5.763 2.93 11.564 4.688 17.746 5.38 2.722.303 8.553.302 11.25-.004 11.668-1.323 22.257-6.408 30.553-14.674 2.95-2.938 4.713-5.054 6.701-8.04 11.546-17.337 11.546-39.721 0-57.058-1.988-2.986-3.752-5.102-6.701-8.04-8.305-8.275-18.853-13.342-30.552-14.676-3.032-.346-9.052-.298-12.032.096-13.964 1.847-26.146 8.951-34.7 20.235-.806 1.065-1.41 1.992-1.343 2.06.068.068 5.262.123 11.542.123h11.419v12.457h-44.803v-44.602H-174.974v11.15c0 6.389.075 11.15.178 11.15.098 0 .882-.88 1.741-1.958 2.021-2.535 6.846-7.336 9.532-9.487 15.753-12.61 36.366-17.09 55.954-12.16 4.652 1.17 7.94 2.389 12.456 4.618 6.811 3.362 11.336 6.554 16.641 11.739 5.482 5.357 9.19 10.497 12.693 17.596 2.23 4.517 3.45 7.804 4.62 12.456 3.114 12.377 2.479 25.66-1.798 37.57-1.14 3.176-4.223 9.483-6.04 12.356-5.088 8.049-12.14 15.102-20.189 20.19-2.879 1.82-9.186 4.902-12.356 6.038-7.861 2.816-16.928 4.147-25.174 3.694zm-2.853-80.15v-22.3h12.454l.051 16.022.052 16.023 16.023.051 16.022.052v12.454h-44.602z";

export default function SearchHistory({ searches = [] }: Props) {
    return (
        <div 
            className={`${style.templateWrapper} ${style.templateWrapperPadding}`}
        >
            <svg
                width='100%'
                height='100%'
                viewBox="0 0 73.442 144.808"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter
                        id="a"
                        width={1.094}
                        height={1.112}
                        x={-0.042}
                        y={-0.052}
                        style={{ colorInterpolationFilters: "sRGB" }}
                    >
                        <feFlood floodColor="#000" floodOpacity={0.165} result="flood" />
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={1.2} />
                        <feOffset dx={0.76} dy={0.456} in="blur" result="offset" />
                        <feComposite in="flood" in2="offset" operator="in" result="comp1" />
                        <feComposite in="SourceGraphic" in2="comp1" result="comp2" />
                    </filter>
                    <path id="b" d="M0 137.674h250.256v63.073H0z" />
                </defs>

                <rect
                    width={70.801} height={56.59} x={1.32} y={58.563} rx={2.053} ry={1.763}
                    style={{ fill: "#fff", fillOpacity: 1, stroke: "#a6a6a6", strokeWidth: 0.128137, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 3.8, strokeDasharray: "none", strokeOpacity: 1, paintOrder: "normal", filter: "url(#a)" }}
                    transform="matrix(.9816 0 0 1.35726 .865 -32.914)"
                />

                <rect width={64.964} height={10.617} x={4.239} y={48.768} rx={1.256} ry={1.256}
                    style={{ fill: "#e9e9e9", fillOpacity: 1, stroke: "none", strokeWidth: 0.33311, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 3.8, strokeDasharray: "none", strokeOpacity: 1, paintOrder: "normal" }}
                />
                <rect width={10.414} height={10.617} x={58.789} y={48.768} rx={1.256} ry={1.256}
                    style={{ fill: "#8398da", fillOpacity: 1, stroke: "none", strokeWidth: 0.359569, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 3.8, strokeDasharray: "none", strokeOpacity: 1, paintOrder: "normal" }}
                />
                <rect width={9.472} height={10.617} x={58.139} y={48.768} rx={0} ry={0}
                    style={{ fill: "#8398da", fillOpacity: 1, stroke: "none", strokeWidth: 0.359569, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 3.8, strokeDasharray: "none", strokeOpacity: 1, paintOrder: "normal" }}
                />

                <g style={{ fill: "#fff", fillOpacity: 1, strokeWidth: 26.0253, strokeDasharray: "none" }}>
                    <path
                        fill="#59f"
                        d="M3938.1 13853c-.93 0-1.86 0-2.788.04-14.862.577-29.504 6.795-40.346 18.512-21.683 23.435-20.253 60.324 3.182 82.008 23.433 21.683 60.325 20.251 82.01-3.183 21.684-23.435 20.25-60.325-3.184-82.009-10.985-10.163-24.928-15.249-38.874-15.369zm-.202 20.65c8.919.08 17.842 3.383 24.963 9.971 15.192 14.057 16.099 37.452 2.042 52.643-14.056 15.191-37.452 16.099-52.643 2.043-15.19-14.056-16.099-37.45-2.042-52.641 7.028-7.596 16.392-11.621 25.897-11.99.594-.02 1.188-.03 1.783-.03z"
                        color="#000"
                        style={{ fill: "#fff", fillOpacity: 1, strokeWidth: 26.0253, strokeDasharray: "none" }}
                        transform="matrix(.05589 0 0 .05393 -157.162 -696.614)"
                    />
                    <path
                        fill="none"
                        stroke="#59f"
                        strokeLinecap="round"
                        strokeWidth={149.634}
                        d="m3972.6 13944 38.081 35.235"
                        style={{ fill: "#fff", fillOpacity: 1, stroke: "#fff", strokeWidth: 22.1698, strokeDasharray: "none", strokeOpacity: 1 }}
                        transform="matrix(.05589 0 0 .05393 -157.162 -696.614)"
                    />
                </g>

                <text
                    xmlSpace="preserve"
                    style={{ fontWeight: 700, fontSize: 48, fontFamily: "Constantia", textAlign: "start", direction: "ltr", whiteSpace: "pre", display: "inline", fill: "#005ca9", fillOpacity: 1, stroke: "none", strokeWidth: 0.434728, strokeDasharray: "none", strokeOpacity: 1, paintOrder: "normal" }}
                    transform="matrix(.30381 0 0 .3048 13.99 -12.421)"
                >
                    <tspan x={0} y={179.721}>
                        <tspan style={{ fill: "#2e6df5" }}>S</tspan>
                        <tspan style={{ fill: "#fad630" }}>e</tspan>
                        <tspan style={{ fill: "#e04f66" }}>a</tspan>
                        <tspan style={{ fill: "#19b1a8" }}>r</tspan>
                        <tspan style={{ fill: "#a77bca" }}>c</tspan>
                        <tspan style={{ fill: "#e04f66" }}>h</tspan>
                    </tspan>
                </text>

                {ROW_OFFSETS.map((offset, i) => (
                    <g key={i}>
                        <circle
                            cx={8.956} cy={offset.circleY} r={3.193}
                            style={{ fill: "#8398da", fillOpacity: 0.223005, stroke: "none", strokeWidth: 0.47625, strokeLinecap: "round", strokeDasharray: "none", strokeOpacity: 1, paintOrder: "normal" }}
                        />

                        <g style={{ fill: "#8398da", fillOpacity: 1, strokeWidth: 37.084 }}>
                            <path
                                d={HISTORY_PATH}
                                style={{ fill: "#8398da", fillOpacity: 1, stroke: "none", strokeWidth: 37.084 }}
                                transform={`matrix(.02697 0 0 .02697 12.236 ${offset.historyY})`}
                            />
                        </g>

                        <path
                            d={`m62.682 ${offset.xY} 4.41 4.23M67.093 ${offset.xY}l-4.411 4.23`}
                            style={{ fill: "#8398da", fillOpacity: 1, stroke: "#ddd", strokeWidth: 0.529168, strokeLinecap: "round", strokeDasharray: "none", strokeOpacity: 1, paintOrder: "normal" }}
                        />

                        <foreignObject
                            x={10}
                            y={88}
                            width={57}
                            height={15}
                            transform={`translate(4.987 ${offset.textTranslateY}) scale(.85243)`}
                            style={{ alignContent: 'center' }}
                        >
                            <div
                                className={style.searchRow}
                            >
                                {searches[i]}
                            </div>
                        </foreignObject>

                        {offset.dividerY && (
                            <path
                                d={`m5.316 ${offset.dividerY} 62.32-.127`}
                                style={{ fill: "none", fillOpacity: 1, stroke: "#ddd", strokeWidth: 0.291042, strokeLinecap: "round", strokeDasharray: "none", strokeOpacity: 1, paintOrder: "normal" }}
                            />
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}