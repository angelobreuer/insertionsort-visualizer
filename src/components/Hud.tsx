export function HudView(props: { index1: number, index2: number, speed?: number, count: number, }) {
    return <div className="absolute top-2 right-2 text-white">
        <span>Index 1: {props.index1}, </span>
        {props.index2 === -1 ? <></> : <span>Index 2: {props.index2}, </span>}
        <span>Geschwindigkeit: {props.speed ? 'Stufe ' + Math.round(props.speed) : "Maximum"}, </span>
        <span>Anzahl: {props.count}</span>
    </div>
}
