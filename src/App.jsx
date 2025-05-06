// import './App.css'

import SalesDashboard from './components/sales-dashboard/index2'
// import TableWithDropdown from './components/table'


function App() {

  return (
    // <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'end' }}>
    <div className='flex justify-center'>
      <div className=' h-full w-3/4'>
        <SalesDashboard />
        {/* <TableWithDropdown /> */}
      </div>
    </div>
    // </div >
  )
}

export default App
