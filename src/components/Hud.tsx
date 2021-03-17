export function HudView(props: { index1: number, index2: number, speed: number }) {
    return <div className="hud" >
        <span>Index 1: {props.index1}, </span>
        <span>Index 2: {props.index2}, </span>
        <span>Geschwindigkeit: {props.speed}x</span>
    </div>
}
