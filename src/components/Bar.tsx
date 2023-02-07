function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
}

function hslToRgb(h: number, s: number, l: number) {
    var r, g, b

    if (s === 0) {
        r = g = b = l // achromatic
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s
        var p = 2 * l - q

        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return `rgb(${r * 255},${g * 255},${b * 255})`
}

export default function Bar(props: { value: number, width: number, highlight: boolean }) {
    const style = {
        backgroundColor: props.highlight ? '#fff' : hslToRgb(props.value, 1, .5),
        height: 200 * props.value,
        width: props.width
    }

    return <div className='mb-8' style={style}></div>
}
