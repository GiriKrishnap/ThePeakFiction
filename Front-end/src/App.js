import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Pages-------------------------------------------------------------------
//reader pages
import LoginPage from './pages/UserPages/LoginPage'
import SignupPage from './pages/UserPages/SignupPage';
import ReaderHomePage from './pages/UserPages/HomePage';
import FilterNovelsPage from './pages/UserPages/FilterPage';

//author
import AuthorHomePage from './pages/AuthorPages/AuthorHome';
import AuthorCreatePage from './pages/AuthorPages/AuthorCreateNovel';

//admin pages
import AdminLoginPage from './pages/AdminPages/adminLoginPage';
import AdminDashboardPage from './pages/AdminPages/adminDashboardPage';
import AdminUserManagement from './pages/AdminPages/adminUsersPage';
import AdminAuthorManagement from './pages/AdminPages/adminAuthorPage';
import AdminGenrePage from './pages/AdminPages/adminGenrePage';
import AdminNovelPage from './pages/AdminPages/adminNovelsPage';


//LINKS---------------------------------------------------------------------
import {
  Login, Signup, adminAuthorManagement, adminDashboard, adminGenreManagement, adminLogin,
  adminNovelManagement,
  adminUserManagement, authorCreate, authorHome, filter, readerHome
} from './util/constants';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* UserPart */}
          <Route exact path={Login} element={<LoginPage />} />
          <Route exact path={Signup} element={<SignupPage />} />
          <Route exact path={readerHome} element={<ReaderHomePage />} />
          <Route exact path={filter} element={<FilterNovelsPage />} />


          {/* AuthorPart */}
          <Route exact path={authorHome} element={<AuthorHomePage />} />
          <Route exact path={authorCreate} element={<AuthorCreatePage />} />


          {/* AdminPart */}
          <Route exact path={adminLogin} element={<AdminLoginPage />} />
          <Route exact path={adminDashboard} element={<AdminDashboardPage />} />
          <Route exact path={adminUserManagement} element={<AdminUserManagement />} />
          <Route exact path={adminAuthorManagement} element={<AdminAuthorManagement />} />
          <Route exact path={adminGenreManagement} element={<AdminGenrePage />} />
          <Route exact path={adminNovelManagement} element={<AdminNovelPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
