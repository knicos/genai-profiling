
import { getImage } from "@genaipg/services/images/images";
import { useEffect, useRef, useState } from "react";
import { memory } from "./types";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";

interface Props {
    memories?: memory[];
    profilePicUrl?: string;
    url?: string;
    editable?: boolean;
    onMemoriesChange?: (memories: memory[]) => void;
}

const MAP_X0 = -4008.569;
const MAP_X1 = MAP_X0 + 640;
const MAP_Y0 = -1874.725;
const MAP_Y1 = -725;

const PIN_W = 180;
const PIN_H = 250;

const MAP_TRANSLATE_X = 4008.57;
const MAP_TRANSLATE_Y = 1874.725;

const VIEWBOX_WIDTH = 640;
const VIEWBOX_HEIGHT = 1261.819;

const STEP = 0.02;
const BIG_STEP = 0.1;

function denorm(pin: memory) {
    return {
        x: MAP_X0 + pin.x * (MAP_X1 - MAP_X0),
        y: MAP_Y0 + pin.y * (MAP_Y1 - MAP_Y0),
    };
}

function getPointerPosition(
    svg: SVGSVGElement,
    clientX: number,
    clientY: number
) {
    const rect = svg.getBoundingClientRect();
    const scale = Math.min(
        rect.width / VIEWBOX_WIDTH,
        rect.height / VIEWBOX_HEIGHT
    );

    const offsetX = (rect.width - VIEWBOX_WIDTH * scale) / 2;
    const offsetY = (rect.height - VIEWBOX_HEIGHT * scale) / 2;

    return {
        x: (clientX - rect.left - offsetX) / scale - MAP_TRANSLATE_X,
        y: (clientY - rect.top - offsetY) / scale - MAP_TRANSLATE_Y,
    };
}

export function MemoryMap({
    memories = [],
    profilePicUrl,
    url,
    editable = false,
    onMemoriesChange,
}: Props) {
    const { t } = useTranslation();
    const [pins, setPins] = useState<memory[]>(memories);
    const [focusedId, setFocusedId] = useState<string | null>(null);

    const svgRef = useRef<SVGSVGElement>(null);
    const dragId = useRef<string | null>(null);
    const grabOffset = useRef({ x: 0, y: 0 });
    const pinsRef = useRef(pins);

    useEffect(() => {
        const unchanged =
            JSON.stringify(pinsRef.current) === JSON.stringify(memories);

        if (unchanged) return;

        pinsRef.current = memories;
        setPins(memories);
    }, [memories]);

    function updatePins(updated: memory[]) {
        pinsRef.current = updated;
        setPins(updated);
    }

    function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
        if (!editable || !svgRef.current) return;

        const target = (e.target as Element).closest("[data-pin-id]");
        if (!target) return;

        const id = target.getAttribute("data-pin-id");
        const pin = pinsRef.current.find((pin) => pin.id === id);

        if (!pin || !id) return;

        const point = getPointerPosition(
            svgRef.current,
            e.clientX,
            e.clientY
        );

        const position = denorm(pin);

        dragId.current = id;
        grabOffset.current = {
            x: point.x - position.x,
            y: point.y - position.y,
        };

        svgRef.current.setPointerCapture(e.pointerId);
    }

    function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
        if (!editable || !dragId.current || !svgRef.current) return;

        const point = getPointerPosition(
            svgRef.current,
            e.clientX,
            e.clientY
        );

        const x = Math.max(
            MAP_X0,
            Math.min(
                MAP_X1,
                point.x - grabOffset.current.x
            )
        );

        const y = Math.max(
            MAP_Y0,
            Math.min(
                MAP_Y1,
                point.y - grabOffset.current.y
            )
        );

        const normalizedX = (x - MAP_X0) / (MAP_X1 - MAP_X0);
        const normalizedY = (y - MAP_Y0) / (MAP_Y1 - MAP_Y0);

        updatePins(
            pinsRef.current.map((pin) =>
                pin.id === dragId.current
                    ? { ...pin, x: normalizedX, y: normalizedY }
                    : pin
            )
        );
    }

    function handlePointerUp() {
        if (dragId.current) {
            onMemoriesChange?.(pinsRef.current);
        }

        dragId.current = null;
    }

    function movePin(id: string, dx: number, dy: number) {
        updatePins(
            pinsRef.current.map((pin) =>
                pin.id === id
                    ? {
                        ...pin,
                        x: Math.min(1, Math.max(0, pin.x + dx)),
                        y: Math.min(1, Math.max(0, pin.y + dy)),
                    }
                    : pin
            )
        );

        onMemoriesChange?.(pinsRef.current);
    }

    function handleKeyDown(id: string, e: React.KeyboardEvent) {
        if (!editable) return;

        const step = e.shiftKey ? BIG_STEP : STEP;

        const moves: Record<string, [number, number]> = {
            ArrowLeft: [-step, 0],
            ArrowRight: [step, 0],
            ArrowUp: [0, -step],
            ArrowDown: [0, step],
        };

        const move = moves[e.key];
        if (!move) return;

        e.preventDefault();
        movePin(id, move[0], move[1]);
    }

    return (
        <div className={style.templateWrapper}>
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 640 1261.819"
                preserveAspectRatio="xMidYMid meet"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <g transform={`translate(${MAP_TRANSLATE_X} ${MAP_TRANSLATE_Y})`}>
                    <foreignObject
                        width={640}
                        height={1300}
                        x={MAP_X0}
                        y={-1880}
                    >
                        <div
                            className={style.imageWrapper}
                            style={{
                                background: url ? "none" : "var(--bg-dark3)",
                            }}
                        >
                            {url && (
                                <img
                                    src={getImage(url)}
                                    className={style.image}
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                        </div>
                    </foreignObject>

                    <foreignObject width={120} height={120} x={-3980} y={-1850}>
                        <div
                            className={style.profilePicWrapper}
                            style={{
                                backgroundColor: profilePicUrl
                                    ? "transparent"
                                    : "black",
                            }}
                        >
                            {profilePicUrl && (
                                <img
                                    src={getImage(profilePicUrl)}
                                    className={style.profilePic}
                                />
                            )}
                        </div>
                    </foreignObject>

                    {pins.map((pin, index) => {
                        const position = denorm(pin);

                        return (
                            <g
                                key={pin.id}
                                data-pin-id={pin.id}
                                transform={`translate(${position.x} ${position.y})`}
                                tabIndex={editable ? 0 : undefined}
                                role={editable ? "button" : undefined}
                                aria-label={
                                    editable
                                        ? `${t("create.clues.templates.memoryMap.memory")} ${index + 1}`
                                        : undefined
                                }
                                onKeyDown={(e) => handleKeyDown(pin.id, e)}
                                onFocus={() => setFocusedId(pin.id)}
                                onBlur={() => setFocusedId(null)}
                                style={
                                    editable
                                        ? {
                                            cursor: "grab",
                                            touchAction: "none",
                                            outline: "none",
                                        }
                                        : undefined
                                }
                            >
                                {editable && focusedId === pin.id && (
                                    <rect
                                        x={-PIN_W / 2 - 20}
                                        y={-PIN_H / 2 - 20}
                                        width={PIN_W + 40}
                                        height={PIN_H + 40}
                                        ry={24}
                                        fill="none"
                                        stroke="var(--text-dark)"
                                        strokeWidth={8}
                                        strokeDasharray="20 12"
                                        pointerEvents="none"
                                    />
                                )}

                                <path
                                    d={`M0 ${PIN_H / 2 + 34} L28 ${PIN_H / 2 - 2} L-28 ${PIN_H / 2 - 2}Z`}
                                    style={{
                                        fill: "var(--primary)"
                                    }}
                                />

                                <rect
                                    width={PIN_W}
                                    height={PIN_H}
                                    x={-PIN_W / 2}
                                    y={-PIN_H / 2}
                                    ry={13.994}
                                    className={style.pinFrame}
                                />

                                <foreignObject
                                    width={PIN_W - 14}
                                    height={PIN_H - 14}
                                    x={-PIN_W / 2 + 7}
                                    y={-PIN_H / 2 + 6}
                                >
                                    <div
                                        className={style.imageWrapper}
                                        style={{
                                            borderRadius: 8
                                        }}
                                    >
                                        <img
                                            src={pin.url ? getImage(pin.url) : ""}
                                            className={style.pinImage}
                                            style={{
                                                backgroundColor: pin.url
                                                    ? "transparent"
                                                    : "white",
                                            }}
                                        />
                                    </div>
                                </foreignObject>

                                <g
                                    transform={`translate(${PIN_W / 2 - 2} ${-PIN_H / 2 + 2})`}
                                    pointerEvents="none"
                                >
                                    <ellipse
                                        cx="0"
                                        cy="0"
                                        rx="35"
                                        ry="35"
                                        fill="var(--primary)"
                                        strokeWidth="5"
                                    />

                                    <text
                                        x="0"
                                        y="1"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="white"
                                        fontSize="32"
                                        fontWeight="700"
                                    >
                                        {index + 1}
                                    </text>
                                </g>
                            </g>
                        );
                    })}

                    <rect
                        width={640}
                        height={200}
                        x={MAP_X0}
                        y={-760}
                        ry={50}
                        style={{
                            fill: "white"
                        }}
                    />

                    <ellipse
                        cx={-3438.145}
                        cy={-685}
                        rx={44.756}
                        ry={39.758}
                        style={{
                            fill: "var(--background)"
                        }}
                    />

                    <path
                        d="m-3453.96 -700 31.63 30.025"
                        className={style.closeIcon}
                    />

                    <path
                        d="m-3422.33 -700 -31.63 30.025"
                        className={style.closeIcon}
                    />

                    <ellipse
                        cx={-3931.94}
                        cy={-685}
                        rx={50.553}
                        ry={46.272}
                        style={{
                            fill: "var(--light-element)"
                        }}
                    />

                    <path
                        d="M-3950.569-712.597a9.45 9.45 0 0 0-9.47 9.473v40.525a9.45 9.45 0 0 0 9.47 9.473h37.256a9.452 9.452 0 0 0 9.473-9.473v-40.525a9.452 9.452 0 0 0-9.473-9.473zm37.787 12.711a3.161 2.905 0 0 1 3.163 2.904 3.161 2.905 0 0 1-3.162 2.907 3.161 2.905 0 0 1-3.16-2.906 3.161 2.905 0 0 1 3.16-2.905zm-31.244 8.738 11.965 14.229 12.551-7.393 11.711 9.655v14.375l-46.943.12.117-18.17z"
                        style={{
                            fill: "var(--primary-dark)"
                        }}
                    />

                    <text
                        xmlSpace="preserve"
                        className={style.captionText}
                        transform="translate(-4021.619 -1745.186)"
                        style={{
                            fontWeight: 700
                        }}
                    >
                        <tspan x={161.643} y={1074.382}>
                            {t("create.clues.templates.memoryMap.memoriesLabel")}
                        </tspan>
                    </text>
                </g>
            </svg>
        </div>
    );
}
