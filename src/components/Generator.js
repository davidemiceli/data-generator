'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { Fira_Code } from 'next/font/google';

const FiraCode = Fira_Code({ subsets: ['latin'] });

const data = [];

export default function Generator() {
    const canvasRef = useRef(null);
    const [ dataset, setDataset ] = useState({x: [], y: []});
    const [params, setParams] = useState({
        datasetName: 'Data',
        xname: 'x',
        yname: 'y',
        scaleRangeMin: 0,
        scaleRangeMax: 100,
        randomDist: 26,
        pointCount: 4,
        pointSize: 1
    });

    const updateParams = e => {
        const { name, value } = e.target;
        setParams(v => {
            v[name] = value;
            return v;
        });
    }
    
    const scaleBetween = (v, scaledMin, scaledMax, minVal, maxVal) => {
        const min = minVal || Math.min(...v);
        const max = maxVal || Math.max(...v);
        return v.map(n => (scaledMax - scaledMin) * (n - min) / (max - min) + scaledMin);
    }
    
    const round = precision => v => parseFloat(v.toFixed(precision || 0));
    
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const getPosition = (event) => {
        const { randomDist, pointCount } = params;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        data.push({x, y});
        for (let i=1; i<pointCount; i++) {
            data.push({
                x: x + randInt(-1 * randomDist, randomDist),
                y: y + randInt(-1 * randomDist, randomDist)
            });
        }
        data.sort((a, b) => a.x - b.x);
        drawCoordinates(canvas, data);
    }
    
    const drawCoordinates = (canvas, points) => {
        const { pointSize } = params;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#888";
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const {x, y} of points) {
            ctx.beginPath();
            ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
    
    const show = () => {
        const { scaleRangeMin, scaleRangeMax } = params;
        const canvas = canvasRef.current;
        const { width: xMax, height: yMax } = canvas;
        const rect = canvas.getBoundingClientRect();
        const rnd = round(2);
        const x = scaleBetween(data.map(v => v.x), scaleRangeMin, scaleRangeMax, 0, xMax).map(rnd);
        const y = scaleBetween(data.map(v => rect.height - v.y), scaleRangeMin, scaleRangeMax, 0, yMax).map(rnd);
        setDataset(_ => ({x, y}));
    }

    const clear = () => {
        const canvas = canvasRef.current;
        data.length = 0;
        setDataset(_ => ({x: [], y: []}));
        drawCoordinates(canvas, data);
    }

    const downloadCsv = () => {
        Papa.unparse(data);
    }

    return (
        <div className='container mx-auto'>
            <div className="grid gap-4 grid-cols-3 gap-6">
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dataset name</label>
                    <input type="text" name='datasetName' defaultValue={params.datasetName} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                </div>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">X variable name</label>
                    <input type="text" name='xname' defaultValue={params.xname} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                </div>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Y variable name</label>
                    <input type="text" name='yname' defaultValue={params.yname} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Scale range (min)</label>
                    <input type="number" name='scaleRangeMin' defaultValue={params.scaleRangeMin} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Scale range (max)</label>
                    <input type="number" name='scaleRangeMax' defaultValue={params.scaleRangeMax} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max random distance betwen points</label>
                    <input type="number" name='randomDist' defaultValue={params.randomDist} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points by action</label>
                    <input type="number" name='pointCount' defaultValue={params.pointCount} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Point size</label>
                    <input type="number" name='pointSize' defaultValue={params.pointSize} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>
            </div>
            <div className="flex justify-center p-4">
                <canvas ref={canvasRef} onClick={(e) => getPosition(e)} width="800" height="300" className="bg-gray-50 rounded shadow-sm cursor-crosshair"></canvas>
            </div>
            <div className="flex justify-center font-bold">
                <button onClick={() => show()} type="button" className="transition duration-700 mt-1 rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 mr-2">Generate</button>
                <button onClick={() => clear()} type="button" className="transition duration-700 mt-1 rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800">Clear</button>
            </div>
            <div className={FiraCode.className + " flex justify-center p-4 text-xs"}>
                {params.xname} = {JSON.stringify(dataset.x, null, 2)}<br />
                {params.yname} = {JSON.stringify(dataset.y, null, 2)}
            </div>
        </div>
    )
}