import SortAlgorithm, { StateInfo } from "./SortAlgorithm"

function* algorithm(array: number[]): Generator<StateInfo> {
    for (let iter = 1; iter < array.length; iter++) {
        yield { array, delay: 40, index: -1, index2: -1, line: 2 }
        for (let index = 0; index < array.length - iter; index++) {
            yield { array, delay: 10, index: index, index2: -1, line: 4 }
            if (array[index] > array[index + 1]) {
                yield { array, delay: 10, index, index2: index + 1, line: 6 }
                yield { array, delay: 10, index, index2: index + 1, line: 7 }
                let temp = array[index]
                array[index] = array[index + 1]
                array[index + 1] = temp
            }
        }
    }
}


const code = `for (int iter = 1; iter < sortierArray.length; iter++)
{
    for (int index = 0; index < sortierArray.length - iter; index++)
    {
        if (sortierArray[index] > sortierArray[index + 1])
        {
            vertausche(index, index + 1);
        }
    }
}`

const BubbleSort: SortAlgorithm = {
    sort: algorithm,
    implementation: code,
    name: "BubbleSort"
}

export default BubbleSort
