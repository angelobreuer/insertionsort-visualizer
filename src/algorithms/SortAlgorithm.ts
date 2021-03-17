export interface StateInfo {
    line: number,
    index: number,
    index2: number,
    array: number[],
    delay: number,
}

export default interface SortAlgorithm {
    sort: (array: number[]) => IterableIterator<StateInfo>,
    implementation: string,
    name: string,
}
