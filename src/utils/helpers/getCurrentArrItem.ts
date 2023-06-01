export function getCurrentArrItem(
    array: any[],
    filterProperty: string,
    filterValue: string | number
): any {
    if (typeof filterValue === 'number') {
        return array.find(item => item[filterProperty] === filterValue);
    } else {
        return array.find(
            item =>
                item[filterProperty].toLowerCase().trim() ===
                filterValue.toLowerCase().trim()
        );
    }
}
