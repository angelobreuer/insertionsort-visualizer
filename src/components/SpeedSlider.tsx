export default function SpeedSlider(props: { onChange: (x: number) => void }) {
    return <div>
        <input
            className="speed-slider"
            type="range"
            onChange={x => props.onChange(x.target.valueAsNumber)}
            min={.1}
            step={.1}
            max={10}></input>
    </div>
}
