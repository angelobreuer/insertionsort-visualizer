import SortAlgorithm, { StateInfo } from "./SortAlgorithm"

function* algorithm(array: number[]): Generator<StateInfo> {
    for (let index = 0; index < array.length - 1; index++) {
        yield { array, delay: 10, index: index, index2: -1, line: 2 }

        let suchPosition = index
        let minimum = array[suchPosition]
        let minimumPosition = suchPosition

        yield { array, delay: 10, index: index, index2: -1, line: 5 }

        while (suchPosition++ < array.length - 1) {
            yield { array, delay: 10, index: index, index2: suchPosition, line: 8 }
            let value = array[suchPosition]
            yield { array, delay: 10, index: index, index2: suchPosition, line: 9 }

            yield { array, delay: 10, index: index, index2: suchPosition, line: 11 }
            if (value < minimum) {
                yield { array, delay: 40, index: index, index2: suchPosition, line: 13 }
                minimum = value
                minimumPosition = suchPosition
            }
        }

        yield { array, delay: 40, index: index, index2: suchPosition, line: 18 }
        let temp = array[minimumPosition]
        yield { array, delay: 20, index: index, index2: suchPosition, line: 19 }
        array[minimumPosition] = array[index]
        yield { array, delay: 20, index: index, index2: suchPosition, line: 20 }
        array[index] = temp
    }
}


const code = `for (int index = 0; index < sortierArray.length - 1; index++)
{
    int suchPosition = index;
    int minimum = this.sortierArray[suchPosition];
    int minimumPosition = suchPosition;

    while (suchPosition++ < this.sortierArray.length - 1)
    {
        int value = this.sortierArray[suchPosition];

        if (value < minimum)
        {
            minimum = value;
            minimumPosition = suchPosition;
        }
    }

    int temp = sortierArray[minimumPosition];
    sortierArray[minimumPosition] = sortierArray[index];
    sortierArray[index] = temp;
}`

const SelectionSort: SortAlgorithm = {
    sort: algorithm,
    implementation: code,
    name: "Selection Sort"
}

export default SelectionSort
