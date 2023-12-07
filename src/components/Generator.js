'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import { Fira_Code } from 'next/font/google';
import dataCtx from 'src/libs/dataset';
import { randInt } from 'src/libs/utilities';

const FiraCode = Fira_Code({ subsets: ['latin'] });

export default function Generator() {
    const canvasRef = useRef(null);
    const Dataset = useContext(dataCtx);
    const [ data, setData ] = useState([]);
    const [params, setParams] = useState({
        datasetName: 'Data',
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
    
    const getPosition = event => {
        const { randomDist, pointCount } = params;
        const { clientX, clientY } = event;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        Dataset.addPoint({x, y});
        for (let i=1; i<pointCount; i++) {
            Dataset.addPoint({
                x: Math.max(0, x + randInt(-1 * randomDist, randomDist)),
                y: Math.max(0, y + randInt(-1 * randomDist, randomDist))
            });
        }
        Dataset.sortPoints();
        drawCoordinates(canvas);
    }
    
    const drawCoordinates = canvas => {
        const { pointSize } = params;
        const { data } = Dataset;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#888";
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const {x, y} of data) {
            ctx.beginPath();
            ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
    
    const addDataset = () => {
        const { yname, scaleRangeMin, scaleRangeMax } = params;
        const canvas = canvasRef.current;
        const { height: yMax } = canvas;
        const rect = canvas.getBoundingClientRect();
        const yoffset = rect.height;
        Dataset.addToDataset(yname, scaleRangeMin, scaleRangeMax, yMax, yoffset);
        const vals = Dataset.generate();
        setData(_ => vals);
    }

    const clearY = () => {
        const canvas = canvasRef.current;
        Dataset.clearY();
        drawCoordinates(canvas);
    }

    const clearDataset = () => {
        const canvas = canvasRef.current;
        Dataset.clearDataset();
        setData(_ => []);
        drawCoordinates(canvas);
    }

    const downloadCsv = () => {
        const csv = Dataset.toCsv(data);
        console.log(csv);
    }

    return (
        <div className='container mx-auto'>
            <div className="grid gap-4 grid-cols-3 gap-6">
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
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dataset name</label>
                    <input type="text" name='datasetName' defaultValue={params.datasetName} onChange={(e) => updateParams(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                </div>
            </div>
            <div className="flex justify-center p-4">
                <canvas ref={canvasRef} onClick={(e) => getPosition(e)} width="800" height="300" className="bg-gray-50 rounded shadow-sm cursor-crosshair"></canvas>
            </div>
            <div className="flex justify-center font-bold">
                <button onClick={() => addDataset()} type="button" className="transition duration-700 mt-1 rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 mr-2">Add</button>
                <button onClick={() => clearY()} type="button" className="transition duration-700 mt-1 rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 mr-2">Clear Y</button>
                <button onClick={() => clearDataset()} type="button" className="transition duration-700 mt-1 rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 mr-2">Clear Dataset</button>
                <button onClick={() => downloadCsv()} type="button" className="transition duration-700 mt-1 rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800">Download</button>
            </div>
            <div className={FiraCode.className + " flex justify-center p-4 text-xs"}>
                {JSON.stringify(data, null, 2)}
            </div>
        </div>
    )
}