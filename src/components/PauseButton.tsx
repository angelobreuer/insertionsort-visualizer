export default function PauseButton(props: { onToggle: (x: any) => void, paused: boolean }) {
    return <button onClick={props.onToggle}>{props.paused ? 'Weiter' : 'Stop'}</button>
}
