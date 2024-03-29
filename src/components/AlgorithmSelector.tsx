import BubbleSort from "../algorithms/BubbleSort"
import BubbleSortOpt from "../algorithms/BubbleSortOpt"
import BucketSort from "../algorithms/BucketSort"
import InsertionSort from "../algorithms/InsertionSort"
import QuickSort from "../algorithms/QuickSort"
import SelectionSort from "../algorithms/SelectionSort"
import SimpleSort from "../algorithms/SimpleSort"
import SortAlgorithm from "../algorithms/SortAlgorithm"

const algorithms = [
    InsertionSort,
    BubbleSort,
    BubbleSortOpt,
    SelectionSort,
    SimpleSort,
    QuickSort,
    BucketSort,
]

export default function AlgorithmSelector(props: { onChange: (algorithm: SortAlgorithm) => void }) {
    return <div>
        <span style={{ color: '#fff' }}>Algorithmus: </span>
        <select onChange={x => props.onChange(algorithms[parseInt(x.target.value)])}>
            {algorithms.map((x, i) => <option key={i} value={i}>{x.name}</option>)}
        </select>
    </div>
}
