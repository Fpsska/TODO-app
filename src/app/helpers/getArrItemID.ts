export function getArrItemID(array: any[], filterValue: string, filterOpt: string): number {
    return array.find(item => item[filterValue] === filterOpt)?.id;
};