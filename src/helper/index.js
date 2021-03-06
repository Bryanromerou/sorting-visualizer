export function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}