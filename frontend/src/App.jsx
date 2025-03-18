import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <div className="max-w-7xl mx-auto px-4">
    <Navbar/>
    <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
    <Outlet/>
    </main>
      <footer>Footer</footer>
    </div>
    </>
  )
}

export default App
