import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';

import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { TabPanel, TabView } from 'primereact/tabview';

export default function Table() {
  const [products, setProducts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'category': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'quantity': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
  });
  const [selectedProducts, setSelectedProducts] = useState(null);

  useEffect(() => {
    // initial dummy data
    setProducts([
      { code: 'P001', name: 'Laptop', category: 'Electronics', quantity: 20 },
      { code: 'P002', name: 'Shampoo', category: 'Cosmetics', quantity: 50 },
      { code: 'P003', name: 'Chair', category: 'Furniture', quantity: 15 },
      { code: 'P004', name: 'Notebook', category: 'Stationery', quantity: 100 },
      { code: 'P005', name: 'Smartphone', category: 'Electronics', quantity: 30 }
    ]);
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const clearFilters = () => {
    setGlobalFilterValue('');
    setFilters({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'category': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'quantity': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });
  }

  const addProduct = () => {
    // simple prompts for demo
    const code = prompt('Enter code:');
    const name = prompt('Enter name:');
    const category = prompt('Enter category:');
    const qtyStr = prompt('Enter quantity:');
    const quantity = parseInt(qtyStr, 10) || 0;
    if (code && name && category) {
      setProducts(prev => [...prev, { code, name, category, quantity }]);
    }
  }

  const deleteSelected = () => {
    if (selectedProducts && selectedProducts.length) {
      const codesToDelete = new Set(selectedProducts.map(p => p.code));
      setProducts(prev => prev.filter(p => !codesToDelete.has(p.code)));
      setSelectedProducts(null);
    }
  }

  const header = (
    <>
      <div className="table-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="p-input-icon-left" style={{ marginRight: 'auto' }}>
          <i className="pi pi-search" style={{ marginLeft: '.5rem' }} />
          <InputText
            style={{ paddingLeft: '2rem' }}
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Global Search"
          />
        </span>
        <Button
          label="Clear Filters"
          icon="pi pi-filter-slash"
          onClick={clearFilters}
          className="p-button-text"
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={deleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
        <Button label="Add" icon="pi pi-plus" onClick={addProduct} />

      </div>
    </>
  );

  return (
    <>
      <p className='text-3xl font-bold mb-4 p-4 mt-5'>Sales Dashboard</p>
      <div className='grid grid-cols-3 gap-2 mb-10'>
        <Card style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.32)' }}>
          <div className='flex justify-between'>
            <div>
              <h1 className='text-xl'>
                Total Sales
              </h1>
              <h1 className='text-3xl font-bold'>
                $1000
              </h1>
            </div>
            <div className="bg-blue-100 p-3 h-13 rounded-full">
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
          <div className='flex justify-between'>
            <div>
              <h1 className='text-xl'>
                Total Sales
              </h1>
              <h1 className='text-3xl font-bold'>
                $1000
              </h1>
            </div>
            <div className="bg-purple-100 p-3 h-13 rounded-full">
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
          <div className='flex justify-between'>
            <div>
              <h1 className='text-xl'>
                Total Sales
              </h1>
              <h1 className='text-3xl font-bold'>
                $1000
              </h1>
            </div>
            <div className="bg-green-100 p-3 h-13 rounded-full">
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
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Header I">
            <h3 className='text-2xl font-bold mb-5'>Product Table</h3>
            <DataTable
              value={products}
              header={header}
              paginator
              rows={5}
              sortMode="multiple"
              removableSort
              filters={filters}
              filterDisplay="menu"
              globalFilterFields={['code', 'name', 'category', 'quantity']}
              selection={selectedProducts}
              onSelectionChange={e => setSelectedProducts(e.value)}
              dataKey="code"
            >
              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
              <Column field="code" header="Code" sortable filter filterPlaceholder="Search by code" />
              <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" />
              <Column field="category" header="Category" sortable filter filterPlaceholder="Search by category" />
              <Column field="quantity" header="Quantity" sortable filter filterPlaceholder="Search by qty" />
            </DataTable>

          </TabPanel>
          <TabPanel header="Header II">
            <p className="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
              enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
              ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
        </TabView>
      </Card>
    </>
  );
}
