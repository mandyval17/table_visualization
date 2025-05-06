import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function DataTablePanel({
  salesData,
  filters, setFilters,
  globalFilterValue, setGlobalFilterValue,
  selectedRows, setSelectedRows,
  onShowAdd, onDeleteSelected
}) {
  const header = (
    <div className="table-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span className="p-input-icon-left" style={{ marginRight: 'auto' }}>
        <i className="pi pi-search" style={{ marginLeft: '.5rem' }} />
        <InputText
          value={globalFilterValue}
          onChange={e => {
            setFilters(f => ({ ...f, global: { ...f.global, value: e.target.value } }));
            setGlobalFilterValue(e.target.value);
          }}
          placeholder="Global Search"
          style={{ paddingLeft: '2rem' }}
        />
      </span>
      <Button label="Clear Filters" icon="pi pi-filter-slash" onClick={() => {
        setGlobalFilterValue('');
        setFilters({
          global: { value: null, matchMode: 'contains' },
          date: { operator: 'and', constraints: [{ value: null, matchMode: 'equals' }] },
          region: { operator: 'and', constraints: [{ value: null, matchMode: 'in' }] },
          product: { operator: 'and', constraints: [{ value: null, matchMode: 'in' }] },
          sales: { operator: 'and', constraints: [{ value: null, matchMode: 'equals' }] },
        });
      }} className="p-button-text" />
      <Button label="Delete" icon="pi pi-trash" onClick={onDeleteSelected} className="p-button-danger" disabled={!selectedRows.length} />
      <Button label="Add" icon="pi pi-plus" onClick={onShowAdd} />
    </div>
  );

  return (
    <DataTable
      value={salesData}
      dataKey="id"
      header={header}
      showGridlines
      stripedRows
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
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
  );
}
