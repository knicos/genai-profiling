interface Props {
    url?: string;
    title?: string;
    artist?: string;
}

export default function StreamingService({ url, title, artist }: Props) {
    return (
        <div style={{ width: "100%", height: "100%", padding: '0 10px', backgroundColor: 'black', boxSizing: 'border-box' }}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 73.441819 144.80828"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
            >
                <g transform="translate(236.64662,29.046766)">

                    <foreignObject
                        x="-236.64662"
                        y="-29.046768"
                        width="73.441818"
                        height="75.497116"
                    >
                        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                            <img
                                src={url}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            />
                        </div>
                    </foreignObject>

                    same for artist13.04Claude responded: Artist pushed to y="80" to sit below the expanded title area.tsx<foreignObject
                        x="-227.30147"
                        y="45"
                        width="54.751503"
                        height="25"
                    >
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '6px',
                            color: 'white',
                            textAlign: 'center',
                            wordBreak: 'break-word',
                        }}>
                            {title ?? ''}
                        </div>
                    </foreignObject>

                    <foreignObject
                        x="-227.30147"
                        y="70"
                        width="54.751503"
                        height="10"
                        style={{ alignContent: 'center' }}
                    >
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '4px',
                            color: 'white',
                            textAlign: 'center',
                            wordBreak: 'break-word',
                        }}>
                            {artist ?? ''}
                        </div>
                    </foreignObject>

                    <rect
                        fill="#635957"
                        width="73.441811"
                        height="1.2810657"
                        x="-236.64662"
                        y="84.629974"
                    />

                    <rect
                        fill="#3d9653"
                        width="26.285976"
                        height="1.2810657"
                        x="-236.64662"
                        y="84.629974"
                    />

                    <text
                        x="-237.01138"
                        y="89.787857"
                        fontSize="3.44px"
                        fill="#635957"
                        transform="scale(0.99085637,1.009228)"
                    >
                        <tspan>1.32</tspan>
                    </text>

                    <text
                        x="-174.97641"
                        y="89.809708"
                        fontSize="3.44px"
                        fill={artist ? "#635957" : "none"}
                        color="white"
                        transform="scale(0.99085637,1.009228)"
                    >
                        <tspan>3.59</tspan>
                    </text>

                    <ellipse
                        fill="#635957"
                        cx="-208.28282"
                        cy="85.270508"
                        rx="2.0778251"
                        ry="0.64053285"
                    />

                    <circle
                        fill="#3d9653"
                        cx="-210.36064"
                        cy="85.270508"
                        r="1.2566911"
                    />
                    <ellipse
                        style={{ fill: 'none', fillOpacity: 1, stroke: '#ffffff', strokeWidth: 0.555625, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }}
                        cx="-199.99866"
                        cy="108.01846"
                        rx="7.7884541"
                        ry="7.4652247"
                    />
                    <rect style={{ fill: '#ffffff', fillOpacity: 1, stroke: '#ffffff', strokeWidth: 0.555624, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }} id="rect6" width="0.88087499" height="7.8805161" x="-202.05185" y="104.0782" />
                    <rect style={{ fill: '#ffffff', fillOpacity: 1, stroke: '#ffffff', strokeWidth: 0.555624, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }} id="rect6-7" width="0.88087499" height="7.8805161" x="-199.00444" y="104.0782" />
                    <rect style={{ fill: '#ffffff', fillOpacity: 1, stroke: '#ffffff', strokeWidth: 0.555624, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }} id="rect6-7-3" width="0.43930021" height="5.9878654" x="-218.89528" y="104.83788" />
                    <path style={{ fill: '#ffffff', fillOpacity: 1, stroke: '#ffffff', strokeWidth: 0.555625, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }} d="m -213.57493,104.29027 v 7.25836 l -5.32035,-3.71678 z" id="path6" />
                    <rect style={{ fill: '#ffffff', fillOpacity: 1, stroke: '#ffffff', strokeWidth: 0.555624, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }} id="rect6-7-3-8" width="0.43930021" height="5.9878654" x="180.94966" y="104.83788" transform="scale(-1,1)" />
                    <path style={{ fill: '#ffffff', fillOpacity: 1, stroke: '#ffffff', strokeWidth: 0.555625, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }} d="m -186.26999,104.29027 v 7.25836 l 5.32035,-3.71678 z" id="path6-5" />
                    <path style={{ fill: '#3d9653', fillOpacity: 1, stroke: 'none', strokeWidth: 0.354191, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }} id="path7" d="m 78.977319,165.09256 -1.007748,-0.73979 -1.180733,0.41075 0.392176,-1.18703 -0.75552,-0.99601 1.250126,0.006 0.713797,-1.02633 0.380444,1.19084 1.196671,0.36171 -1.014999,0.72982 z" transform="matrix(1.5464087,-0.26360803,0.26360803,1.5464087,-332.50712,-124.03009)" />
                    <path style={{ fill: '#3d9653', fillOpacity: 1, stroke: 'none', strokeWidth: 0.555626, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 3.8, strokeDasharray: 'none', strokeOpacity: 1 }} d="m -231.81303,110.24179 c 0,0 -3.6092,-2.66747 -2.15146,-4.01453 1.23162,-1.13809 2.19824,0.45213 2.19824,0.45213 0,0 0.93399,-1.55002 2.21382,-0.54566 1.82731,1.43401 -2.2606,4.10806 -2.2606,4.10806 z" id="path8" />


                </g>
            </svg>
        </div>
    );
}

