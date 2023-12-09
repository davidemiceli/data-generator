'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import { Fira_Code } from 'next/font/google';
import dataCtx from 'src/libs/dataset';

const FiraCode = Fira_Code({ subsets: ['latin'] });

export default () => {
    const Dataset = useContext(dataCtx);

    const renderRow = (rows, cols) => {
        return rows.map((row, i) => {
            return <tr key={`r${i}`} className="bg-white border-b font-medium text-gray-900">
              {renderTd(cols, row)}
            </tr>
        })
    }

    const renderTd = (cols, row) => {
        return cols.map((c, i) => (
            <td className="px-2 py-2 whitespace-nowrap" key={`c${i}`}>{row[c]}</td>
        ));
    }

    const renderTable = () => {
        if (Dataset.output.length === 0) return;
        const cols = Dataset.getHeader();
        return (
            <div className={`${FiraCode.className}`}>
                <table className="w-full text-xs text-left text-gray-500">
                    <thead className="text-gray-700 uppercase bg-gray-50">
                        <tr>
                            {cols.map(k => <th key={k} scope="col" className="px-2 py-2">{k}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {renderRow(Dataset.output, cols)}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="container mx-auto mb-2">
            <div className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Data</div>
            <div>{renderTable()}</div>
        </div>
    )
}