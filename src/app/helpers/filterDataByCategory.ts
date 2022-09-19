export function filterDataByCategory(array: any[], filterProp: string): any[] {
    switch (filterProp) {
        case 'all':
            return array;
        case filterProp:
            return array.filter(item => item.category === filterProp.toLocaleLowerCase().trim());
        default:
            return array;
    }
};