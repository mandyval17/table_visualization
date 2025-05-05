// import './App.css'
import { Card } from 'primereact/card'
import Table from './components/table'

function App() {

  return (
    // <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'end' }}>
    <Card style={{ width: '98%', boxShadow: '0 6px 12px rgba(0,0,0,0.32), 0 6px 12px rgba(0,0,0,0.46)' }}>
      <Table />
    </Card>
    // </div >
  )
}

export default App
