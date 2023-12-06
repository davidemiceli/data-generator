'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import { Fira_Code } from 'next/font/google';

const FiraCode = Fira_Code({ subsets: ['latin'] });

export default function Generator() {
    const canvasRef = useRef(null);
    const [ dataset, setDataset ] = useState([]);
    const data = [];
    const scaleRange = [0, 100];
    const randomDist = 26;
    const pointCount = 3;
    const pointSize = 2;
    
    const scaleBetween = (v, scaledMin, scaledMax) => {
        const max = Math.max(...v);
        const min = Math.min(...v);
        return v.map(n => (scaledMax - scaledMin) * (n - min) / (max-min) + scaledMin);
    }
    
    const round = precision => v => parseFloat(v.toFixed(precision || 0));
    
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const getPosition = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        data.push({x, y});
        for (let i=0; i<pointCount; i++) {
        data.push({
            x: x + randInt(-1 * randomDist, randomDist),
            y: y + randInt(-1 * randomDist, randomDist)
        });
        }
        data.sort((a, b) => a.x - b.x);
        drawCoordinates(canvas, data);
    }
    
    const drawCoordinates = (canvas, points) => {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        ctx.fillStyle = "#888";
        for (const {x, y} of points) {
            ctx.beginPath();
            ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
    
    const show = () => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const rnd = round(2);
        const x = scaleBetween(data.map(v => v.x), ...scaleRange).map(rnd);
        const y = scaleBetween(data.map(v => rect.height - v.y), ...scaleRange).map(rnd);
        setDataset(_ => [x, y]);
    }

    return (
        <div className='container mx-auto'>
            <div className="flex justify-center p-4">
                <canvas ref={canvasRef} onClick={(e) => getPosition(e)} width="800" height="300" className="bg-gray-50 rounded shadow-sm cursor-crosshair"></canvas>
            </div>
            <div className="flex justify-center font-bold">
                <button onClick={() => show()} type="button" className="transition duration-700 mt-1 rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800">Generate Data</button>
            </div>
            <div className="flex justify-center p-4 font-monospace text-xs">
                {JSON.stringify(dataset, null, 2)}
            </div>
        </div>
    )
}