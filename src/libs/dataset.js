'use client';
import { createContext } from 'react';
import Papa from 'papaparse';
import { round, scaleBetween } from 'src/libs/utilities';


export default createContext({
    data: [],
    dataset: {},
    columns: [],
    keyCol: '__x',
    sortPoints() {
        this.data.sort((a, b) => a.x - b.x);
    },
    addPoint(v) {
        this.data.push(v);
    },
    addVector(x, y, yname) {
        for (const [i, v] of x.entries()) {
            if (!(v in this.dataset)) this.dataset[v] = {};
            this.dataset[v][yname] = y[i];
        }
    },
    transformData() {
        return Object.entries(this.dataset).sort((a, b) => a[0] - b[0]).map(v => v[1]);
    },
    clearY() {
        this.data = [];
    },
    clearDataset() {
        this.dataset = {};
        this.columns = [];
    },
    addColumn(col) {
        if (!this.columns.includes(col)) this.columns.push(col);
    },
    addToDataset(yname, scaleRangeMin, scaleRangeMax, yMax, yoffset) {
        const { data } = this;
        const rnd = round(2);
        const x = data.map(v => v.x).map(rnd);
        const y = scaleBetween(data.map(v => yoffset - v.y), scaleRangeMin, scaleRangeMax, 0, yMax).map(rnd);
        this.addVector(x, y, yname);
        this.addColumn(yname);
    },
    generate() {
        const { keyCol } = this;
        return Object.entries(this.dataset).sort((a, b) => a[0] - b[0]).map(v => Object.assign({[keyCol]: Number(v[0])}, v[1]));
    },
    toCsv(output) {
        const { keyCol, columns: cols } = this;
        const columns = [keyCol, ...cols];
        const csv = Papa.unparse(output, {header: true, columns});
        return csv;
    }
});
