import SortAlgorithm, { StateInfo } from "./SortAlgorithm"

function* algorithm(array: number[]): Generator<StateInfo> {
    const buckets: number[][] = []

    const hashFunc = (value: number) => Math.sqrt(value)
    const update = () => array = ([] as number[]).concat(...buckets)

    let maxValue = 0
    array.forEach(x => maxValue < x ? maxValue = x : x)

    for (let i = 0; i < maxValue; i++) {
        buckets.push([])
    }

    update()

    let index = 0

    for (let x of array) {
        yield { array, delay: 30, index: index++, index2: -1, line: 24 }
        let hash = hashFunc(x)
        buckets[hash].push(x)
        update()
        yield { array, delay: 30, index: index++, index2: -1, line: 25 }
    }

    for (let bucket of buckets) {
        yield { array, delay: 30, index: index++, index2: -1, line: 48 }
        bucket.sort();
        update()
        yield { array, delay: 30, index: index++, index2: -1, line: 49 }
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
