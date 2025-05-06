import { Card } from 'primereact/card';
import React from 'react';

export default function SummaryCards({ salesData }) {
  const totalSales = salesData.reduce((sum, { sales }) => sum + sales, 0);
  const orders = salesData.length;
  const avgSale = orders ? (totalSales / orders).toFixed(2) : '0.00';
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-10">
        <Card style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.32)' }}>
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl">Total Sales</h1>
              <h1 className="text-3xl font-bold">${totalSales}</h1>
            </div>
            <div className="bg-blue-100 p-3 rounded-full h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </Card>
        <Card style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.32)' }}>
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl">Total Orders</h1>
              <h1 className="text-3xl font-bold">{orders}</h1>
            </div>
            <div className="bg-purple-100 p-3 rounded-full h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </Card>
        <Card style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.32)' }}>
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl">Average Sale</h1>
              <h1 className="text-3xl font-bold">${avgSale}</h1>
            </div>
            <div className="bg-green-100 p-3 rounded-full h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </>

  );
}
