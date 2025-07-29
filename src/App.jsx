
import './App.css'
// In App.jsx or index.js
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom'
import SideNavbar from './components/SideNavbar'
import TopNavbar from './components/TopNavbar'
import { ToastContainer } from 'react-toastify';

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
       <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
