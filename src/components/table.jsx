import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';

import 'primeicons/primeicons.css';
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
    <div className="card">
      <div className="card">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Header I">
            <h3>Product Table</h3>
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
      </div>

    </div>
  );
}
