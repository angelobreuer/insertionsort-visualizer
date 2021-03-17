import SortAlgorithm, { StateInfo } from "./SortAlgorithm"

function* algorithm(array: number[]): Generator<StateInfo> {
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

const InsertionSort: SortAlgorithm = {
    sort: algorithm,
    implementation: code,
    name: "Insertion Sort"
}

export default InsertionSort
