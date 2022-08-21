export function filter(array: any[], filterProp: string): any[] {
    switch (filterProp) {
        case '#all':
            return array;
        case filterProp:
            return array.filter(item => item.category.toLowerCase() === filterProp);
        default:
            return array;
    }
};