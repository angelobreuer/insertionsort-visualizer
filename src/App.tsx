import React from 'react'
import './App.css'
import Bar from './components/Bar'
import Debugger from './components/Debugger'
import PauseButton from './components/PauseButton'
import SpeedSlider from './components/SpeedSlider'

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
        <Debugger line={this.state.line} code={code} />
        <div className="container">
          {this.state.array.map((value, index) => <Bar highlight={index === this.state.index || index === this.state.index2} value={value} width={widthPerTile} />)}
        </div>
      </div>
    )
  }
}


export default App
