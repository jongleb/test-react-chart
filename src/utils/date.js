
const DAY_IN_MS = 864e5;


export function dayOfYear (date) {
    if (!date) date = new Date();

    let then = noon(date.getFullYear(), date.getMonth(), date.getDate()),
        first = noon(date.getFullYear(), 0, 0);

    return Math.round((then - first) / DAY_IN_MS);
}

function noon(year, month, day) {
    return new Date(year, month, day, 12, 0, 0);
}