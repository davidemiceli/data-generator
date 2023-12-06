import { sum as msum, add as madd, dotMultiply, dotDivide, max as mmax, min as mmin, round as mround } from 'mathjs';

export const uniform = arr => arr.map(_ => Math.random());

export const argmax = arr => arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];

export const amax = v => mmax(v);

export const amin = v => mmin(v);

export const zeros = n => Array(n).fill(0);

export const afull = (v, n) => Array(n).fill(v);

export const sum = msum;

export const round = mround;

export const add = (n, d, out) => {
    const v = madd(n, d);
    return out ? Array(out).fill(v) : v;
}

export const multiply = (n, d, out) => {
    const v = dotMultiply(n, d);
    return out ? Array(out).fill(v) : v;
}

export const divide = (n, d, out) => {
    const r = dotDivide(n, d);
    const v = r == Infinity ? 0 : r;
    return out ? Array(out).fill(v) : v;
}
