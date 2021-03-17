export default function SpeedSlider(props: { onChange: (x: number) => void }) {
    return <div>
        <input
            className="speed-slider"
            type="range"
            onChange={x => props.onChange(x.target.valueAsNumber)}
            min={0}
            step={.1}
            max={5}></input>
    </div>
}
