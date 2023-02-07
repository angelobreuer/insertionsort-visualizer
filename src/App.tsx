import { Component, ReactNode, useState } from 'react'
import InsertionSort from './algorithms/InsertionSort'
import SortAlgorithm, { StateInfo } from './algorithms/SortAlgorithm'
import './App.css'
import AlgorithmSelector from './components/AlgorithmSelector'
import Bar from './components/Bar'
import CountSlider from './components/CountSlider'
import Debugger from './components/Debugger'
import { HudView } from './components/Hud'
import SpeedSlider from './components/SpeedSlider'

class View extends Component<
  { algorithm: SortAlgorithm, count: number, speed: { value: number, } },
  StateInfo & { generator: IterableIterator<StateInfo>, algorithm: SortAlgorithm, }> {
  private step: number = 0
  private delay?: number
  private currentSpeed?: number
  private interval?: NodeJS.Timeout

  constructor(props: { algorithm: SortAlgorithm, count: number, speed: { value: number, } }) {
    super(props)
    this.state = this.createState(props.count, props.algorithm)
  }

  private createState = (count: number, algorithm: SortAlgorithm): StateInfo & { generator: IterableIterator<StateInfo>, algorithm: SortAlgorithm, } => {
    const array = Array.from({ length: count, }, Math.random);
    return { array, delay: 0, index: -1, index2: -1, line: -1, generator: algorithm.sort(array), algorithm, };
  }

  private tick = () => {
    const actualSpeed = Math.round(10 * Math.pow(Math.E, -1.2 * this.props.speed.value)) // 10e^-1.2x

    if (actualSpeed !== this.currentSpeed) {
      clearInterval(this.interval)
      this.currentSpeed = actualSpeed
      this.interval = setInterval(this.tick.bind(this), this.currentSpeed);
    }

    if (this.props.speed.value !== undefined &&
      this.delay !== undefined &&
      this.step++ < this.delay) {
      return
    }

    let result: IteratorResult<StateInfo, any> | undefined = undefined

    const count = this.props.speed.value > 4
      ? Math.round((this.props.speed.value - 4) * 1000.0)
      : 1

    for (var index = 0; index < count; index++) {
      result = this.state.generator.next()

      if (result.done) {
        clearInterval(this.interval)
        this.interval = undefined
        break
      }

      this.delay = result.value.delay
      this.step = 0
    }

    this.setState({ ...this.state, ...result!.value })
  }

  componentDidMount(): void {
    this.tick();
  }

  componentWillUnmount(): void {
    clearInterval(this.interval)
    this.interval = undefined
  }

  render(): ReactNode {
    const widthPerTile = window.innerWidth / this.state.array.length
    console.log(this.props.algorithm.name)
    console.log(this.state.algorithm.name)

    return <div>
      <HudView index1={this.state.index} index2={this.state.index2} speed={this.props.speed.value} count={this.props.count} />
      <Debugger line={this.state.line} code={this.props.algorithm.implementation} />

      <div className="w-full justify-center justify-items-center items-end content-center flex">
        {this.state.array.map((value, index) => <Bar key={index}
          highlight={index === this.state.index || index === this.state.index2}
          value={value}
          width={widthPerTile} />)}
      </div>
    </div>
  }
}

export default function App() {
  const [count, setCount] = useState(50);
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>(InsertionSort)
  const speed: { value: number } = { value: 1 }

  return (
    <div className="min-h-screen h-full bg-[#1F2022] p-8">
      <AlgorithmSelector onChange={setAlgorithm} />

      <SpeedSlider onChange={x => speed.value = x} />
      <CountSlider onChange={setCount} />

      <View algorithm={algorithm} key={`${algorithm.name}:${count}`} count={count} speed={speed} />
    </div>
  )
}