import SortAlgorithm, { StateInfo } from "./SortAlgorithm"

function swap(array: number[], i: number, j: number) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

function* algorithm_(array: number[], left: number, right: number): IterableIterator<StateInfo> {
    if (left >= right) {
        yield { array, index: left, index2: right, delay: 20, line: 2 }
        return
    }


    yield { array, index: left, index2: right, delay: 20, line: 5 }
    let pivot = array[right], i = left, j = right - 1

    while (i < j) {
        yield { array, index: i, index2: j, delay: 20, line: 9 }
        for (; array[i] < pivot; i++) {
            yield { array, index: i, index2: pivot, delay: 20, line: 9 }
        }

        for (; j > left && array[j] >= pivot; j--) {
            yield { array, index: j, index2: pivot, delay: 20, line: 13 }
        }

        if (i < j) {
            yield { array, index: i, index2: j, delay: 20, line: 17 }
            swap(array, i, j)
            i++
            j--
        }
    }

    if (i === j && array[i] < pivot) {
        yield { array, index: i, index2: j, delay: 20, line: 24 }
        i++
    }

    if (array[i] !== pivot) {
        yield { array, index: i, index2: j, delay: 20, line: 28 }
        swap(array, i, right)
    }

    yield { array, index: i, index2: j, delay: 20, line: 31 }
    for (const x of algorithm_(array, left, i - 1)) {
        yield x
    }

    yield { array, index: i, index2: j, delay: 20, line: 32 }
    for (const x of algorithm_(array, i + 1, right)) {
        yield x
    }
}

function algorithm(array: number[]): Generator<StateInfo> {
    return algorithm_(array, 0, array.length - 1) as any
}


const code = `if (left >= right) {
    return;
}

int pivot = array[right], i = left, j = right - 1;

while (i < j) {
    for (; array[i] < pivot; i++)
    {
    }

    for (; j > left && array[j] >= pivot; j--)
    {
    }

    if (i < j) {
        swap(array, i, j);
        i++;
        j--;
    }
}

if (i == j && array[i] < pivot) {
    i++;
}

if (array[i] != pivot) {
    swap(array, i, right);
}

quicksort(array, left, i - 1);
quicksort(array, i + 1, right);`

const QuickSort: SortAlgorithm = {
    sort: algorithm,
    implementation: code,
    name: "Quick Sort"
}

export default QuickSort
