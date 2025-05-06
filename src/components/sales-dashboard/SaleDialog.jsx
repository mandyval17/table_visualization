import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

export default function SaleDialog({ visible, onHide, onSubmit, salesData, methods }) {
  // derive dropdown options exactly as before
  const regionOptions = Array.from(new Set(salesData.map(d => d.region))).map(region => ({ label: region, value: region }));
  const productOptions = Array.from(new Set(salesData.map(d => d.product))).map(product => ({ label: product, value: product }));

  return (
    <Dialog header="Add New Sale" visible={visible} onHide={onHide} draggable={false}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-fluid grid gap">
        <Controller
          name="date"
          control={methods.control}
          render={({ field, fieldState }) => (
            <div className="field col-12">
              <label htmlFor="date" className="font-medium">Date <span className="text-red-500">*</span></label>
              <Calendar id="date" value={field.value} onChange={e => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon className={`w-full ${fieldState.error ? 'p-invalid' : ''}`} />
              {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
            </div>
          )}
        />
        {/* region, product, sales controllers unchanged */}
        <Controller
          name="region" control={methods.control}
          render={({ field, fieldState }) => (
            <div className="field col-12">
              <label htmlFor="region" className="font-medium">Region <span className="text-red-500">*</span></label>
              <Dropdown id="region" value={field.value} options={regionOptions} onChange={e => field.onChange(e.value)} placeholder="Select region" className={`w-full ${fieldState.error ? 'p-invalid' : ''}`} />
              {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
            </div>
          )}
        />
        <Controller
          name="product" control={methods.control}
          render={({ field, fieldState }) => (
            <div className="field col-12">
              <label htmlFor="product" className="font-medium">Product <span className="text-red-500">*</span></label>
              <Dropdown id="product" value={field.value} options={productOptions} onChange={e => field.onChange(e.value)} placeholder="Select product" className={`w-full ${fieldState.error ? 'p-invalid' : ''}`} />
              {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
            </div>
          )}
        />
        <Controller
          name="sales" control={methods.control}
          render={({ field, fieldState }) => (
            <div className="field col-12">
              <label htmlFor="sales" className="font-medium">Sales Amount <span className="text-red-500">*</span></label>
              <InputNumber value={field.value} onValueChange={e => field.onChange(e.value)} onBlur={field.onBlur} id="sales" mode="currency" currency="USD" locale="en-US" placeholder="Enter sales amount" className={`w-full ${fieldState.error ? 'p-invalid' : ''}`} />
              {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
            </div>
          )}
        />
        <div className="field col-12 flex justify-end gap-2 mt-4">
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onHide} />
          <Button type="submit" label="Save Sale" icon="pi pi-check" autoFocus />
        </div>
      </form>
    </Dialog>
  );
}
