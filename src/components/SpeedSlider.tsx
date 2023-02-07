export default function SpeedSlider({ onChange, }: { onChange: (speed: number) => void }) {
    return <div className="my-4">
        <p className="text-white">Geschwindigkeit: </p>
        <input
            className="speed-slider"
            style={{ width: '100%', maxWidth: '600px' }}
            type="range"
            onChange={x => onChange(x.target.valueAsNumber)}
            min={1}
            step={.1}
            defaultValue={1}
            max={5}></input>
    </div>
}
