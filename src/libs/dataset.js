'use client';
import { createContext } from 'react';
import Papa from 'papaparse';
import { round, scaleBetween } from 'src/libs/utilities';


export default createContext({
    data: [],
    dataset: [],
    columns: [],
    output: [],
    keyCol: '__x',
    addPoint(v) {
        const {x, y} = v;
        this.data[x] = {x, y};
    },
    addVector(x, y, yname) {
        for (const [i, v] of x.entries()) {
            if (this.dataset[v] === undefined) this.dataset[v] = {};
            this.dataset[v][yname] = y[i];
        }
    },
    clearY() {
        this.data = [];
    },
    clearDataset() {
        this.dataset = {};
        this.columns = [];
        this.output = [];
    },
    addColumn(col) {
        if (!this.columns.includes(col)) this.columns.push(col);
    },
    addToDataset(yname, scaleRangeMin, scaleRangeMax, yMax, yoffset) {
        const { data } = this;
        const rnd = round(2);
        const notEmpty = data.filter(Boolean);
        const x = notEmpty.map(v => v.x);
        const y = scaleBetween(notEmpty.map(v => yoffset - v.y), scaleRangeMin, scaleRangeMax, 0, yMax).map(rnd);
        this.addVector(x, y, yname);
        this.addColumn(yname);
        return this;
    },
    generate() {
        const { keyCol } = this;
        this.output = this.dataset.map((v, i) => Object.assign({[keyCol]: i}, v)).filter(Boolean);
        return this.output;
    },
    getHeader() {
        const { keyCol, columns: cols } = this;
        return [keyCol, ...cols];
    },
    toCsv() {
        const columns = this.getHeader();
        const csv = Papa.unparse(this.output, {header: true, columns});
        return csv;
    }
});
