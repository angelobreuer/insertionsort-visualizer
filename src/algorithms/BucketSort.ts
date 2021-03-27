import SortAlgorithm, { StateInfo } from "./SortAlgorithm"

function* algorithm(array: number[]): Generator<StateInfo> {
    const buckets: number[][] = []
    const originalArray = [...array]

    const hashFunc = (value: number) => Math.floor(value * 10)
    const update = () => array = buckets.reduce((a, b) => a.concat(b), [])

    let maxValue = 0
    array.forEach(x => x > maxValue ? maxValue = x : x)

    for (let i = 0; i < 10; i++) {
        buckets.push([])
    }

    yield { array: update(), delay: 30, index: -1, index2: -1, line: 0 }

    let index = 0

    for (let x of originalArray) {
        yield { array: update(), delay: 30, index: index++, index2: -1, line: 3 }
        let hash = hashFunc(x)
        buckets[hash].push(x)
        yield { array: update(), delay: 30, index: index++, index2: -1, line: 4 }
        yield { array: update(), delay: 30, index: index++, index2: -1, line: 5 }
    }

    for (let bucket of buckets) {
        yield { array: update(), delay: 200, index: index++, index2: -1, line: 10 }
        bucket.sort()
        yield { array: update(), delay: 200, index: index++, index2: -1, line: 11 }
    }
}

const code = `// Populate values to buckets
for (int x : this.array)
{
    int hash = hash(x);
    this.buckets[hash].add(x);
}

// Sort buckets
for (ArrayList<Integer> bucket : this.buckets)
{
    Collections.sort(bucket);
}`

const BucketSort: SortAlgorithm = {
    sort: algorithm,
    implementation: code,
    name: "BucketSort"
}

export default BucketSort
