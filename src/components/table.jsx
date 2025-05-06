import { zodResolver } from '@hookform/resolvers/zod';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { TabPanel, TabView } from 'primereact/tabview';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

const saleSchema = z.object({
  date: z.date().refine(val => !isNaN(val.getTime()), { message: 'Invalid date' }),
  region: z.string().min(1, 'Region is required'),
  product: z.string().min(1, 'Product is required'),
  sales: z.number().min(0, 'Sales must be non-negative'),
});

export default function TableWithDropdown() {
  const [salesData, setSalesData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    region: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
    product: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
    sales: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  const methods = useForm({
    resolver: zodResolver(saleSchema),
    defaultValues: { date: null, region: '', product: '', sales: 0 }
  });

  useEffect(() => {
    const data = [
      { id: uuidv4(), date: '2025-04-25', region: 'North America', product: 'Laptop', sales: 120 },
      { id: uuidv4(), date: '2025-04-25', region: 'Europe', product: 'Smartphone', sales: 95 },
      { id: uuidv4(), date: '2025-04-26', region: 'Asia', product: 'Tablet', sales: 75 },
      { id: uuidv4(), date: '2025-04-26', region: 'North America', product: 'Monitor', sales: 30 },
      { id: uuidv4(), date: '2025-04-27', region: 'Europe', product: 'Headphones', sales: 45 },
      { id: uuidv4(), date: '2025-04-27', region: 'Asia', product: 'Camera', sales: 60 },
    ];
    setSalesData(data);
  }, []);

  const regionOptions = Array.from(new Set(salesData.map(d => d.region))).map(region => ({ label: region, value: region }));
  const productOptions = Array.from(new Set(salesData.map(d => d.product))).map(product => ({ label: product, value: product }));

  const onGlobalFilterChange = e => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, global: { ...prev.global, value } }));
    setGlobalFilterValue(value);
  };

  const clearFilters = () => {
    setGlobalFilterValue('');
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      region: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
      product: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
      sales: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
  };

  const deleteSelected = () => {
    if (selectedRows.length) {
      setSalesData(prev => prev.filter(d => !selectedRows.includes(d)));
      setSelectedRows([]);
    }
  };

  const onSubmit = form => {
    const { date, ...rest } = form;
    const newRecord = {
      id: uuidv4(),
      ...rest,
      date: date.toISOString().split('T')[0]
    };
    setSalesData(prev => [...prev, newRecord]);
    methods.reset();
    setShowDialog(false);
  };

  const totalSales = salesData.reduce((sum, { sales }) => sum + sales, 0);
  const orders = salesData.length;
  const avgSale = orders ? (totalSales / orders).toFixed(2) : '0.00';

  const regionTotals = {};
  const dateTotals = {};
  const productTotals = {};
  salesData.forEach(({ region, date, product, sales }) => {
    regionTotals[region] = (regionTotals[region] || 0) + sales;
    dateTotals[date] = (dateTotals[date] || 0) + sales;
    productTotals[product] = (productTotals[product] || 0) + sales;
  });

  const pieData = { labels: Object.keys(regionTotals), datasets: [{ label: 'Sales by Region', data: Object.values(regionTotals) }] };
  const lineData = { labels: Object.keys(dateTotals).sort(), datasets: [{ label: 'Daily Sales', type: 'line', data: Object.keys(dateTotals).sort().map(d => dateTotals[d]), fill: false }] };
  const barData = { labels: Object.keys(productTotals), datasets: [{ label: 'Sales by Product', data: Object.values(productTotals) }] };

  const header = (
    <div className="table-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span className="p-input-icon-left" style={{ marginRight: 'auto' }}>
        <i className="pi pi-search" style={{ marginLeft: '.5rem' }} />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Global Search" style={{ paddingLeft: '2rem' }} />
      </span>
      <Button label="Clear Filters" icon="pi pi-filter-slash" onClick={clearFilters} className="p-button-text" />
      <Button label="Delete" icon="pi pi-trash" onClick={deleteSelected} className="p-button-danger" disabled={!selectedRows.length} />
      <Button label="Add" icon="pi pi-plus" onClick={() => setShowDialog(true)} />
    </div>
  );

  return (
    <>
      <p className="text-3xl font-bold mb-4 p-4 mt-5">Sales Dashboard</p>
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

      <Card style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.32), 0 6px 12px rgba(0,0,0,0.46)' }}>
        <TabView>
          <TabPanel header="Data Table">
            <DataTable
              value={salesData}
              dataKey="id"
              header={header} paginator
              rows={5}
              globalFilterFields={['date', 'region', 'product']}
              filters={filters}
              sortMode="multiple"
              removableSort
              selection={selectedRows}
              onSelectionChange={e => setSelectedRows(e.value)}
            >
              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
              <Column field="date" header="Date" sortable filter filterPlaceholder="Filter by date" />
              <Column field="region" header="Region" sortable filter filterPlaceholder="Filter by region" />
              <Column field="product" header="Product" sortable filter filterPlaceholder="Filter by product" />
              <Column field="sales" header="Sales" sortable filter filterPlaceholder="Filter by sales" />
            </DataTable>
          </TabPanel>
          <TabPanel header="Analytics">
            <p className="text-2xl font-bold mb-8">Monthly Sales</p>
            <div className="grid grid-cols-2 gap-4">
              <Card style={{ height: '500px', boxShadow: '0 6px 12px rgba(0,0,0,0.32)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h4 className="mb-2">By Region</h4>
                <div className="w-full h-96">
                  <Chart type="pie" data={pieData} options={chartOptions} style={{ width: '100%', height: '100%' }} />
                </div>
              </Card>
              <Card style={{ height: '500px', boxShadow: '0 6px 12px rgba(0,0,0,0.32)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h4 className="mb-2">By Product</h4>
                <div className="w-full h-96">
                  <Chart type="bar" data={barData} options={chartOptions} style={{ width: '100%', height: '100%' }} />
                </div>
              </Card>
              <Card style={{ height: '500px', boxShadow: '0 6px 12px rgba(0,0,0,0.32)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h4 className="mb-2">Daily Trend</h4>
                <div className="w-full h-96">
                  <Chart type="line" data={lineData} options={chartOptions} style={{ width: '100%', height: '100%' }} />
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabView>
      </Card>

      <Dialog
        header="Add New Sale"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        draggable={false}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="p-fluid grid gap">
            {/* Date */}
            <Controller
              name="date"
              control={methods.control}
              render={({ field, fieldState }) => (
                <div className="field col-12">
                  <label htmlFor="date" className="font-medium">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <Calendar
                    id="date"
                    value={field.value}
                    onChange={e => field.onChange(e.value)}
                    dateFormat="dd/mm/yy"
                    showIcon
                    className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                  />
                  {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
                </div>
              )}
            />
            {/* Region */}
            <Controller
              name="region"
              control={methods.control}
              render={({ field, fieldState }) => (
                <div className="field col-12">
                  <label htmlFor="region" className="font-medium">
                    Region <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    id="region"
                    value={field.value}
                    options={regionOptions}
                    onChange={e => field.onChange(e.value)}
                    placeholder="Select region"
                    className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                  />
                  {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
                </div>
              )}
            />
            {/* Product */}
            <Controller
              name="product"
              control={methods.control}
              render={({ field, fieldState }) => (
                <div className="field col-12">
                  <label htmlFor="product" className="font-medium">
                    Product <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    id="product"
                    value={field.value}
                    options={productOptions}
                    onChange={e => field.onChange(e.value)}
                    placeholder="Select product"
                    className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                  />
                  {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
                </div>
              )}
            />
            {/* Sales */}
            <Controller
              name="sales"
              control={methods.control}
              render={({ field, fieldState }) => (
                <div className="field col-12">
                  <label htmlFor="sales" className="font-medium">
                    Sales Amount <span className="text-red-500">*</span>
                  </label>
                  <InputNumber
                    value={field.value}
                    onValueChange={e => field.onChange(e.value)}
                    onBlur={field.onBlur}
                    id="sales"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    placeholder="Enter sales amount"
                    className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                  />
                  {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
                </div>
              )}
            />
            <div className="field col-12 flex justify-end gap-2 mt-4">
              <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setShowDialog(false)} />
              <Button type="submit" label="Save Sale" icon="pi pi-check" autoFocus />
            </div>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
}
