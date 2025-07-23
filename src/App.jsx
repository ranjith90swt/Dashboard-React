
import './App.css'
// In App.jsx or index.js
import 'normalize.css';
import { Outlet } from 'react-router-dom'
import SideNavbar from './components/SideNavbar'
import TopNavbar from './components/TopNavbar'

function App() {


  return (
    <>
     <div className="page-wrap d-flex">
        <div className="side-bar">
            <SideNavbar />
        </div>
        <div className="main-bx">
            <TopNavbar />
            <Outlet />
        </div>
     </div>
    </>
  )
}

export default App
