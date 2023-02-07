const padLine = (index: number) => {
    index++

    if (index < 10) {
        return ' ' + index
    }

    return index
}

function Line({ highlight, number, content, }: { highlight: boolean, number: number, content: string, }) {
    return <div key={`line-${number}`} className={highlight ? "bg-red-400" : ''}>
        <span className="mr-4 inline-block">{padLine(number)}</span>
        {content.length ? content : <br />}
    </div>
}

export default function Debugger({ line, code }: { line: number, code: string }) {
    return <pre className="text-white font-mono">
        <code>
            {code.split('\n').map((content, index) => <Line key={index} content={content} number={index} highlight={index + 1 === line} />)}
        </code>
    </pre>
}
