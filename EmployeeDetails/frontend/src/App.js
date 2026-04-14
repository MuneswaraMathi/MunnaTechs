import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Register from './components/Register';
import Login from './components/Login';
import UpdatePassword from './components/UpdatePassword';
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import SaveContribution from './components/contribution/SaveContribution';
import AddAddress from './components/address/AddAddress';
import ShowAddresses from'./components/address/ShowAddresses';
import ShowContributions from './components/contribution/ShowContributions';
import ShowPersonalInfo from './components/personalInfo/ShowPersonalInfo';
import AddActivity from './components/activity/AddActivity';
import ShowActivities from './components/activity/ShowActivities';
import AddEvent from './components/event/AddEvent';
import ShowEvents from './components/event/ShowEvents';
import FundsReport from './components/contribution/FundsReport';
import AddExpense from './components/expense/AddExpense';
import ShowExpenses from './components/expense/ShowExpenses';
import BalanceReport from './components/balance/BalanceReport';

function RequireAuth({ children }) {
  const hasToken = Boolean(localStorage.getItem('token'));
  const hasRegisteredUser = Boolean(localStorage.getItem('email'));
  return (hasToken || hasRegisteredUser) ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router basename="/village/potumeraka">
      <div style={{maxWidth:600, margin:'40px auto', fontFamily:'Arial, sans-serif'}}>
        <nav>
          <Link 
            to="/" 
            style={{ 
              marginRight: '20px', 
              textDecoration: 'none', 
              color: '#007bff' 
            }}
          >
          </Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path='/personalDetails/showPersonalInfo' element={<ShowPersonalInfo/>}/>
          <Route
            path='/address/addAddress'
            element={
              <RequireAuth>
                <AddAddress/>
              </RequireAuth>
            }
          />
          <Route
            path='/address/getAddress'
            element={
              <RequireAuth>
                <ShowAddresses/>
              </RequireAuth>
            }
          />
          <Route path='/contributions/showContributions' element={<ShowContributions/>}/>
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contributions/saveContribution" element={<SaveContribution />} />
          <Route path="/activities/addActivity" element={<RequireAuth><AddActivity /></RequireAuth>} />
          <Route path="/activities/showActivities" element={<RequireAuth><ShowActivities /></RequireAuth>} />
          <Route path="/events/addEvent" element={<RequireAuth><AddEvent /></RequireAuth>} />
          <Route path="/events/showEvents" element={<RequireAuth><ShowEvents /></RequireAuth>} />
          <Route path="/contributions/fundsReport" element={<RequireAuth><FundsReport /></RequireAuth>} />
          <Route path="/expenses/addExpense" element={<RequireAuth><AddExpense /></RequireAuth>} />
          <Route path="/expenses/showExpenses" element={<RequireAuth><ShowExpenses /></RequireAuth>} />
          <Route path="/balance/balanceReport" element={<RequireAuth><BalanceReport /></RequireAuth>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
