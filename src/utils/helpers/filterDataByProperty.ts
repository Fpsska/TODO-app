export function filterDataByProperty<T, K extends keyof T>(
    array: T[],
    filterProp: K,
    value: string
): T[] {
    switch (value) {
        case 'all':
            return array;
        case value:
            return array.filter((item: T) => item[filterProp] === value);
        default:
            return array;
    }
}
