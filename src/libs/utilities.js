
export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const rand = len => Math.floor(Math.random() * len);

export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const round = precision => v => parseFloat(v.toFixed(precision || 0));

export const scaleBetween = (v, scaledMin, scaledMax, minVal, maxVal) => {
    const min = minVal || Math.min(...v);
    const max = maxVal || Math.max(...v);
    return v.map(n => (scaledMax - scaledMin) * (n - min) / (max - min) + scaledMin);
}

export const pickRandom = items => items[Math.floor(Math.random()*items.length)];

export const distance = (a, b) => Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));

export const distanceSigned = (a, b) => Math.sqrt( Math.pow((a[0]-b[0]), 2) + Math.pow((a[1]-b[1]), 2) );

