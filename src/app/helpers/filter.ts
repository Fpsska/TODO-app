export function filter(array: any[], filterProp: string): any[] {
    // console.log(filterProp)
    switch (filterProp) {
        case 'all':
            return array;
        case filterProp:
            return array.filter(item => item.category === filterProp.toLocaleLowerCase().trim());
        default:
            return array;
    }
};