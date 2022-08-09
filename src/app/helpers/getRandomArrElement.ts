export function getRandomArrElement(array: any): string {
    return array[Math.floor(Math.random() * array.length)];
}