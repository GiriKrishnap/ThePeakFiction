import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Pages
//reader pages
import LoginPage from './pages/UserPages/LoginPage'
import SignupPage from './pages/UserPages/SignupPage';
import ReaderHomePage from './pages/UserPages/HomePage';
//admin pages
import AdminLoginPage from './pages/AdminPages/adminLoginPage';
import AdminDashboardPage from './pages/AdminPages/adminDashboardPage';
import AdminUserManagement from './pages/AdminPages/adminUsersPage';


//LINKS
import { Login, Signup, adminDashboard, adminLogin, adminUserManagement, readerHome } from './util/constants';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* userPart */}
          <Route exact path={Login} element={<LoginPage />} />
          <Route exact path={Signup} element={<SignupPage />} />
          <Route exact path={readerHome} element={<ReaderHomePage />} />


          <Route exact path={adminLogin} element={<AdminLoginPage />} />
          <Route exact path={adminDashboard} element={<AdminDashboardPage />} />
          <Route exact path={adminUserManagement} element={<AdminUserManagement />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
