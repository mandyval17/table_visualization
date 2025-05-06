import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React from 'react';

function _initialFilters() {
  return {
    global: { value: null, matchMode: 'contains' },
    date: { operator: 'and', constraints: [{ value: null, matchMode: 'equals' }] },
    region: { operator: 'and', constraints: [{ value: null, matchMode: 'in' }] },
    product: { operator: 'and', constraints: [{ value: null, matchMode: 'in' }] },
    sales: { operator: 'and', constraints: [{ value: null, matchMode: 'equals' }] }
  };
}

function SalesTable({
  salesData, filters, setFilters, globalFilterValue,
  selectedRows, setSelectedRows, onDelete, onAdd
}) {

  const header = (
    <div className="table-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span className="p-input-icon-left" style={{ marginRight: 'auto' }}>
        <i className="pi pi-search" style={{ marginLeft: '.5rem' }} />
        <InputText
          value={globalFilterValue}
          onChange={e =>
            setFilters({ ...filters, global: { ...filters.global, value: e.target.value } })
          }
          placeholder="Global Search"
        />
      </span>
      <Button label="Clear" icon="pi pi-filter-slash" />
      <Button label="Delete" icon="pi pi-trash" onClick={onDelete} disabled={!selectedRows.length} />
      <Button label="Add" icon="pi pi-plus" onClick={onAdd} />
    </div>
  );

  const dateFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
  };

  return (
    <DataTable
      value={salesData}
      dataKey="id"
      header={header}
      paginator rows={5}
      filters={filters}
      selection={selectedRows}
      onSelectionChange={e => setSelectedRows(e.value)}
      globalFilterFields={['date', 'region', 'product']}
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
      <Column field="date" header="Date" filterField="date" dataType="date" filterElement={dateFilterTemplate} sortable filter />
      <Column field="region" header="Region" sortable filter />
      <Column field="product" header="Product" sortable filter />
      <Column field="sales" header="Sales" sortable filter />
    </DataTable>
  );
}

// SalesTable.initialFilters = initialFilters();

export default SalesTable;
