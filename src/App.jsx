//to use react router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//define components
import UserAsideBar from './components/AsideBar/UserAsideBar.jsx'
import AdminAsideBar from './components/AsideBar/AdminAsideBar.jsx'

//define teller pages
import AdminLogin from './pages/admin/Login.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'

//define teller pages
import UserDashboard from './pages/UserDashboard.jsx'
import KycPage from './pages/Kyc.jsx'; // kyc page
import Home from './pages/Home.jsx'
import NoPage from './pages/NoPage.jsx'
import Login from './pages/Login.jsx'
import Transaction from './pages/Transaction.jsx';


//define css files
import './index.css'
import './styles/global.scss'
import Account from './components/accounts/index.jsx'; 


function App() {

  return (
    <div className='App'>
      <Router>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/@adminLogin" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />

            <Route path="/transaction" element={<Transaction/>}/>

            {/* teller routes */}
            <Route path="/adminhomepage" element={<AdminAsideBar />} />
            <Route path="/adminusers" element={<AdminUsers />} />            
            <Route path="/adminaccounts" element={<Account />} />

            {/* user routes */}
            <Route path="/userhomepage" element={<UserAsideBar />} />
            {/* <Route path="/userDashboard" element={<UserDashboard />} /> */}

            <Route path="*" element={<NoPage />} />
            <Route path="/kyc" element={<KycPage/>} /> 
          </Routes>
        </div>
      </Router>
    </div>
  )
}
export default App;
