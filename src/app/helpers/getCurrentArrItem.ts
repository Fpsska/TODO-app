export function getCurrentArrItem(array: any[], filterValue: string | number, filterOpt: string | number): any {
    return array.find(item => item[filterValue] === filterOpt);
};