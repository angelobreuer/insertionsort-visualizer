const padLine = (index: number) => {
    index++

    if (index < 10) {
        return ' ' + index
    }

    return index
}

export default function Debugger(props: { line: number, code: string }) {
    return <pre style={{ color: '#fff' }}>
        <code>
            {props.code.split('\n').map((x, i) => <div
                key={`line-${i}`}
                className={props.line === i + 1 ? 'line-highlight' : 'no-line-highlight'}>{padLine(i)} {x.length ? x : <br />}</div>)}
        </code>
    </pre>
}
