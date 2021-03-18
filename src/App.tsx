import React from 'react'
import BubbleSort from './algorithms/BubbleSort'
import SortAlgorithm, { StateInfo } from './algorithms/SortAlgorithm'
import './App.css'
import AlgorithmSelector from './components/AlgorithmSelector'
import Bar from './components/Bar'
import Debugger from './components/Debugger'
import { HudView } from './components/Hud'
import PauseButton from './components/PauseButton'
import SpeedSlider from './components/SpeedSlider'

function generateValues(count: number) {
  var arr: number[] = []

  for (let index = 0; index < count; index++) {
    arr.push(Math.random())
  }

  return arr
}

interface Config {
  speed: number,
  pause: boolean
}

interface State {
  array: number[],
  line: number,
  generator: IterableIterator<StateInfo>,
  algorithm: SortAlgorithm,
  index: number,
  index2: number,
  config: Config
}

function stateFactory(count: number, algorithm: SortAlgorithm) {
  const array = generateValues(count)
  return { array, line: 0, generator: algorithm.sort(array), algorithm, index: 0, index2: 0, config: { pause: false, speed: 1 } }
}

const defaultState = stateFactory(100, InsertionSort)

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

    const result = this.state.generator.next()
    const info: StateInfo = result.value

    if (result.done) {
      return
    }

    this.setState({ ...this.state, ...info })
    setTimeout(this.tick.bind(this), info.delay / this.state.config.speed)
  }

  render() {
    const widthPerTile = window.innerWidth / this.state.array.length

    return (
      <div className="app">
        <AlgorithmSelector onChange={algo => this.setState(stateFactory(100, algo))} />
        <HudView index1={this.state.index} index2={this.state.index2} speed={this.state.config.speed} />
        <SpeedSlider onChange={x => this.setState({ ...this.state, config: { ...this.state.config, speed: x } })} />
        <PauseButton onToggle={x => this.setState({ ...this.state, config: { ...this.state.config, pause: !this.state.config.pause } })} paused={this.state.config.pause} />
        <Debugger line={this.state.line} code={this.state.algorithm.implementation} />
        <div className="container">
          {this.state.array.map((value, index) => <Bar highlight={index === this.state.index || index === this.state.index2} value={value} width={widthPerTile} />)}
        </div>
      </div>
    )
  }
}


export default App
