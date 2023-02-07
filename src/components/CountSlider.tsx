export default function CountSlider(props: { onChange: (x: number) => void }) {
    return <div className="my-4">
        <p className="text-white">Anzahl: </p>
        <input
            className="count-slider"
            style={{ width: '100%', maxWidth: '600px' }}
            type="range"
            onChange={x => props.onChange(x.target.valueAsNumber)}
            min={3}
            step={1}
            max={1000}></input>
    </div>
}
