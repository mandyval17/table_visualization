import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

export default function AnalyticsPanel({ salesData }) {
  // compute totals exactly as in your original
  const regionTotals = {};
  const dateTotals = {};
  const productTotals = {};

  salesData.forEach(({ region, date, product, sales }) => {
    regionTotals[region] = (regionTotals[region] || 0) + sales;
    dateTotals[date] = (dateTotals[date] || 0) + sales;
    productTotals[product] = (productTotals[product] || 0) + sales;
  });
  console.log(salesData, regionTotals, dateTotals, productTotals);

  const pieData = { labels: Object.keys(regionTotals), datasets: [{ data: Object.values(regionTotals) }] };
  const barData = { labels: Object.keys(productTotals), datasets: [{ data: Object.values(productTotals) }] };
  const lineData = {
    labels: Object.keys(dateTotals).sort(),
    datasets: [{ type: 'line', data: Object.keys(dateTotals).sort().map(d => dateTotals[d]), fill: false }]
  };
  console.log(pieData)

  const options = { responsive: true, maintainAspectRatio: false };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card style={{ height: '500px', boxShadow: '0 6px 12px rgba(0,0,0,0.32)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h4 className="mb-2">By Region</h4>
        <div className="w-full h-96"><Chart type="pie" data={pieData} options={options} style={{ width: '100%', height: '100%' }} /></div>
      </Card>

      <Card style={{ height: '500px', boxShadow: '0 6px 12px rgba(0,0,0,0.32)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h4 className="mb-2">By Product</h4>
        <div className="w-full h-96"><Chart type="bar" data={barData} options={options} style={{ width: '100%', height: '100%' }} /></div>
      </Card>

      <Card style={{ height: '500px', boxShadow: '0 6px 12px rgba(0,0,0,0.32)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h4 className="mb-2">Daily Trend</h4>
        <div className="w-full h-96"><Chart type="line" data={lineData} options={options} style={{ width: '100%', height: '100%' }} /></div>
      </Card>
    </div>
  );
}
