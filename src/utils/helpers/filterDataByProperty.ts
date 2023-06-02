export function filterDataByProperty<T, K extends keyof T>(
    array: T[],
    filterProp: K,
    value: string
): T[] {
    if (value === 'all') {
        return array;
    } else {
        return array.filter((item: T) => item[filterProp] === value);
    }
}
