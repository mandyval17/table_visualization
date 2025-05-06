import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import React from 'react';

export default function DataTablePanel({
  salesData,
  filters, setFilters,
  globalFilterValue, setGlobalFilterValue,
  selectedRows, setSelectedRows,
  onShowAdd, onDeleteSelected
}) {
  const regions = React.useMemo(() => {
    const unique = new Set(salesData.map(item => item.region));
    return Array.from(unique).sort();
  }, [salesData]);

  const products = React.useMemo(() => {
    const unique = new Set(salesData.map(item => item.product));
    return Array.from(unique).sort();
  }, [salesData]);

  const dateBodyTemplate = (rowData) => {
    return new Date(rowData.date).toLocaleDateString();
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value)}
        dateFormat="mm/dd/yy"
        placeholder="Select Date"
        showIcon
      />
    );
  };

  const regionFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={regions}
        onChange={(e) => options.filterCallback(e.value)}
        placeholder="Select Regions"
        showClear
        className="p-column-filter"
      />
    );
  };

  const productFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={products}
        onChange={(e) => options.filterCallback(e.value)}
        placeholder="Select Products"
        showClear
        className="p-column-filter"
      />
    );
  };

  const salesFilterTemplate = (options) => {
    return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
  };

  const header = (
    <div className="table-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span className="p-input-icon-left" style={{ marginRight: 'auto' }}>
        <i className="pi pi-search" style={{ marginLeft: '.5rem' }} />
        <InputText
          value={globalFilterValue}
          onChange={e => {
            setGlobalFilterValue(e.target.value);
            setFilters({
              ...filters,
              global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
            });
          }}
          placeholder="Global Search"
          style={{ paddingLeft: '2rem' }}
        />
      </span>
      <Button label="Clear Filters" icon="pi pi-filter-slash" onClick={() => {
        setGlobalFilterValue('');
        setFilters({
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
          date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
          region: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
          product: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
          sales: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] },
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
      <Column
        field="date"
        header="Date"
        sortable
        body={dateBodyTemplate}
        filter
        filterElement={dateFilterTemplate}
        filterMatchMode="dateIs"
      />
      <Column
        field="region"
        header="Region"
        sortable
        filter
        filterElement={regionFilterTemplate}
        filterMatchMode="in"
      />
      <Column
        field="product"
        header="Product"
        sortable
        filter
        filterElement={productFilterTemplate}
        filterMatchMode="in"
      />
      <Column
        field="sales"
        header="Sales"
        sortable
        filter
        dataType="numeric"
        filterMatchMode='greaterThan'
        filterElement={salesFilterTemplate}
        filterPlaceholder="Filter by sales"
      />
    </DataTable>
  );
}