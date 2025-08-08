
import './App.css'
// In App.jsx or index.js
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom'
import SideNavbar from './components/SideNavbar'
import TopNavbar from './components/TopNavbar'
import { ToastContainer } from 'react-toastify';

function App() {
      const navigate = useNavigate();
      const handleLogout = () => {
         sessionStorage.clear(); // or removeItem("token") / removeItem("user")
         localStorage.clear();
         navigate('/');
     };  
  return (
    <>
      <div className="page-wrap d-flex">
        <div className="side-bar">
          <SideNavbar handleLogout={handleLogout} />
        </div>
        <div className="main-bx px-0 pt-0">
          <TopNavbar handleLogout={handleLogout}/>
          <div className="px-3">
            <Outlet/>
          </div>
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
        // theme="colored"
      />
    </>
  )
}

export default App
