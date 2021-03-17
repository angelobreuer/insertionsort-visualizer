import React, { useState } from 'react'
import './App.css'

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

function Bar(props: { value: number, width: number, highlight: boolean }) {
  const style = {
    backgroundColor: props.highlight ? '#fff' : hslToRgb(props.value, 1, .5),
    height: 200 * props.value,
    width: props.width
  }

  return <div className='bar' style={style}></div>
}

function generateValues(count: number) {
  var arr: number[] = []

  for (let index = 0; index < count; index++) {
    arr.push(Math.random())
  }

  return arr
}

const code = `for (int i = 1; i <= array.length - 1; i++)
{
    // Aktuellen Wert zwischenspeichern
    int temp = array[i];
    int j = i - 1;

    // Datensätze tauschen und dabei den Platz für die aktuelle Zahl suchen
    while (j >= 0 && array[j] > temp)
    {
        array[j + 1] = array[j];
        j--;
    }

    // Zwischengespeicherte Zahl erneut schreiben an ihrem eigentlichen Platz
    array[j + 1] = temp;
}`

interface Config {
  speed: number,
  pause: boolean
}

interface StateInfo {
  line: number,
  index: number,
  index2: number,
  array: number[],
  delay: number,
}

function* insertionSort(array: number[]): Generator<StateInfo> {
  for (let index = 1; index <= array.length - 1; index++) {
    yield { index: index, line: 1, array, delay: 30, index2: 0 }
    const temp = array[index]
    yield { index: index, line: 2, array, delay: 30, index2: 0 }

    let j = index - 1

    yield { index: index, line: 8, array, delay: 30, index2: j }
    while (j >= 0 && array[j] > temp) {
      yield { index: index, line: 10, array, delay: 30, index2: j }
      array[j + 1] = array[j]
      yield { index: index, line: 11, array, delay: 30, index2: j }
      j--
    }

    array[j + 1] = temp

    yield { index: index, line: 15, array, delay: 100, index2: j }
  }
}

function Debugger(props: { line: number }) {
  return <pre style={{ color: '#fff' }}>
    <code>
      {code.split('\n').map((x, i) => <div
        key={`line-${i}`}
        className={props.line === i + 1 ? 'line-highlight' : 'no-line-highlight'}>{i + 1} {x.length ? x : <br />}</div>)}
    </code>
  </pre>
}

function PauseButton(props: { onToggle: (x: any) => void, paused: boolean }) {
  return <button onClick={props.onToggle}>{props.paused ? 'Weiter' : 'Stop'}</button>
}

function SpeedSlider(props: { onChange: (x: number) => void }) {
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

const generator = insertionSort(generateValues(100))

interface State {
  array: number[],
  line: number,
  generator: Generator<StateInfo>,
  index: number,
  index2: number,
  config: Config
}

function stateFactory(count: number) {
  const array = generateValues(count)
  return { array, line: 0, generator: insertionSort(array), index: 0, index2: 0, config: { pause: false, speed: 1 } }
}

const defaultState = stateFactory(100)

class App extends React.Component<{}, State>{
  constructor(props: {}) {
    super(props)
    this.state = defaultState
  }

  componentDidMount() {
    setTimeout(this.tick.bind(this), 100)
  }

  tick() {
    if (this.state.config.pause) {
      setTimeout(this.tick.bind(this), 100)
      return
    }

    const result = generator.next()
    const info: StateInfo = result.value

    if (result.done) {
      return
    }

    this.setState({ generator: this.state.generator, ...info, config: this.state.config })
    setTimeout(this.tick.bind(this), info.delay * (3 - Math.max(.1, Math.min(5, this.state.config.speed))))
  }

  render() {
    console.log(this.state.index)
    const widthPerTile = window.innerWidth / this.state.array.length

    return (
      <div className="app">
        <SpeedSlider onChange={x => this.setState({ ...this.state, config: { ...this.state.config, speed: x } })} />
        <PauseButton onToggle={x => this.setState({ ...this.state, config: { ...this.state.config, pause: !this.state.config.pause } })} paused={this.state.config.pause} />
        <Debugger line={this.state.line} />
        <div className="container">
          {this.state.array.map((value, index) => <Bar highlight={index === this.state.index || index === this.state.index2} value={value} width={widthPerTile} />)}
        </div>
      </div>
    )
  }
}


export default App
