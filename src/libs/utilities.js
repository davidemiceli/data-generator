
export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const rand = len => Math.floor(Math.random() * len);

export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const scaleBetween = (n, minTarget, maxTarget, min, max) => Math.round((maxTarget - minTarget) * (n - min) / (max - min) + minTarget);

export const pickRandom = items => items[Math.floor(Math.random()*items.length)];

export const distance = (a, b) => Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));

export const distanceSigned = (a, b) => Math.sqrt( Math.pow((a[0]-b[0]), 2) + Math.pow((a[1]-b[1]), 2) );

