import { zodResolver } from '@hookform/resolvers/zod';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import AnalyticsPanel from './analytics-panel';
import DataTablePanel from './data-table-panel';
import SaleDialog from './sale-dialog';
import SummaryCards from './summary-card';

import { Card } from 'primereact/card';
import Tabs from './tab';
import { saleSchema } from './utils';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

export default function SalesDashboard() {
  const [salesData, setSalesData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    region: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    product: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    sales: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const methods = useForm({
    resolver: zodResolver(saleSchema),
    defaultValues: { date: null, region: '', product: '', sales: 0 }
  });

  useEffect(() => {
    const data = [
      { id: uuidv4(), date: new Date('2025-04-25'), region: 'North America', product: 'Laptop', sales: 120 },
      { id: uuidv4(), date: new Date('2025-04-25'), region: 'Europe', product: 'Smartphone', sales: 95 },
      { id: uuidv4(), date: new Date('2025-04-26'), region: 'Asia', product: 'Tablet', sales: 75 },
      { id: uuidv4(), date: new Date('2025-04-26'), region: 'North America', product: 'Monitor', sales: 30 },
      { id: uuidv4(), date: new Date('2025-04-27'), region: 'Europe', product: 'Headphones', sales: 45 },
      { id: uuidv4(), date: new Date('2025-04-27'), region: 'Asia', product: 'Camera', sales: 60 },
    ];
    setSalesData(data);
  }, []);

  const handleAddSale = form => {
    const newRecord = {
      id: uuidv4(),
      ...form,
    };
    setSalesData(prev => [...prev, newRecord]);
    methods.reset();
    setShowDialog(false);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length) {
      setSalesData(prev => prev.filter(d => !selectedRows.includes(d)));
      setSelectedRows([]);
    }
  };

  return (
    <>
      <p className="text-3xl font-bold mb-4 p-4 mt-5">Sales Dashboard</p>

      <SummaryCards salesData={salesData} />

      <Card style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.32), 0 6px 12px rgba(0,0,0,0.46)' }}>
        <div className="mb-10">
          <Tabs>
            <DataTablePanel
              salesData={salesData}
              filters={filters}
              setFilters={setFilters}
              globalFilterValue={globalFilterValue}
              setGlobalFilterValue={setGlobalFilterValue}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              onDeleteSelected={handleDeleteSelected}
              onShowAdd={() => setShowDialog(true)}
            />
            <AnalyticsPanel salesData={salesData} />
          </Tabs>
        </div>
      </Card>

      <FormProvider {...methods}>
        <SaleDialog
          visible={showDialog}
          onHide={() => setShowDialog(false)}
          onSubmit={handleAddSale}
          salesData={salesData}
          methods={methods}
        />
      </FormProvider>
    </>
  );
}
