import SortAlgorithm, { StateInfo } from "./SortAlgorithm"

function* algorithm(array: number[]): Generator<StateInfo> {
    for (let index = 0; index < array.length - 1; index++) {
        yield { array, delay: 10, index, index2: -1, line: 3 }
        for (let index2 = index + 1; index2 < array.length; index2++) {
            yield { array, delay: 10, index, index2, line: 6 }
            yield { array, delay: 10, index, index2, line: 7 }
            if (array[index] >= array[index2]) {
                yield { array, delay: 60, index, index2, line: 10 }
                let temp = array[index]
                array[index] = array[index2]
                array[index2] = temp
                yield { array, delay: 60, index, index2, line: 13 }
            }
        }
    }
}

const code = `// Die For-Schleife läuft von dem ersten Element/Index bis zum vorletzen Index durch.
for (int i = 0; i < zahlenfeld.length - 1; i++)
{
    // Die For-Schleife läuft von dem Index der nach dem Index der äußeren For-Schleife
    // ist bis zum letzten Index (diesmal nicht bis zum vorletzen) durch.
    for (int j = i + 1; j < zahlenfeld.length; j++)
    {
        // Schauen, ob die erste der Zahlen größer oder gleich der zweiten Zahl ist.
        if (zahlenfeld[i] >= zahlenfeld[j])
        {
            // Die beiden Zahlen werden vertauscht, und die Methode 'tausche()' erhält
            // die Indize der Elemente an denen die Elemente vertauscht werden sollen.
            tausche(i, j);
        }
    }
}`

const SimpleSort: SortAlgorithm = {
    sort: algorithm,
    implementation: code,
    name: "SimpleSort"
}

export default SimpleSort
