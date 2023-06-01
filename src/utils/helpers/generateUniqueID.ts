export function generateUniqueID(length = 6): string {
    return Math.random()
        .toString(36)
        .substring(2, length + 2);
}
