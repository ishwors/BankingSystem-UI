//to use react router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//define components
import Navbar from './components/Navbar.jsx'

//define pages
import AdminLogin from './pages/admin/Login.jsx'

import Home from './pages/Home.jsx'
import NoPage from './pages/NoPage.jsx'
import Login from './pages/Login.jsx'


//define css files
import './index.css'

function App() {

  return (
    <div className='App'>
      <Router>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/@adminLogin" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
export default App;
