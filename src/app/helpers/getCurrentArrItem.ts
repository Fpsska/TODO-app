export function getCurrentArrItem(array: any[], filterProperty: string, filterValue: string | number): any {
    if (typeof filterValue === 'number') {
        return array.find(item => item[filterProperty] === filterValue);
    } else {
        console.log(filterValue)
        return array.find(item => item[filterProperty].toLowerCase() === filterValue);
    }
};