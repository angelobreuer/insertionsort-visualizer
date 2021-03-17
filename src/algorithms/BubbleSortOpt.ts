import SortAlgorithm, { StateInfo } from "./SortAlgorithm"

function* algorithm(array: number[]): Generator<StateInfo> {
    for (let iter = 1; iter < array.length; iter++) {
        let flag = false
        yield { line: 2, index: -1, index2: -1, array, delay: 40 }

        for (let index = 0; index < array.length - iter; index++) {
            yield { line: 6, index, index2: -1, array, delay: 10 }

            if (array[index] > array[index + 1]) {
                yield { line: 9, index, index2: -1, array, delay: 10 }
                let temp = array[index]
                array[index] = array[index + 1]
                array[index + 1] = temp
                flag = true
            }
        }

        if (!flag) {
            yield { line: 17, index: -1, index2: -1, array, delay: 10 }
            break
        }
    }
}


const code = `for (int iter = 1; iter < sortierArray.length; iter++)
{
    boolean flag = false;

    for (int index = 0; index < sortierArray.length - iter; index++)
    {
        if (sortierArray[index] > sortierArray[index + 1])
        {
            vertausche(index, index + 1);
            flag = true;
        }
    }

    if (!flag)
    {
        // Sortierung fertiggestellt
        break;
    }
}`

const BubbleSortOpt: SortAlgorithm = {
    sort: algorithm,
    implementation: code,
    name: 'Bubble Sort (mit Flag-Optimierung)'
}

export default BubbleSortOpt
