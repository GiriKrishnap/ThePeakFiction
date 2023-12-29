//..............................................................................................
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//LINKS.........................................................................................
import {
  AuthorAddChapter,
  AuthorNovelDetails,
  Login, Signup, adminAuthorManagement, adminDashboard, adminGenreManagement, adminLogin,
  adminNovelManagement,
  adminUserManagement, authorCreate, authorHome, authorNovels, filter, novelDetailedView, readerHome
} from './util/constants';


//Pages.........................................................................................

//reader pages
const LoginPage = lazy(() => import('./pages/UserPages/LoginPage'));
const SignupPage = lazy(() => import('./pages/UserPages/SignupPage'))
const ReaderHomePage = lazy(() => import('./pages/UserPages/HomePage'))
const FilterNovelsPage = lazy(() => import('./pages/UserPages/FilterPage'))
const NovelDetailedPage = lazy(() => import('./pages/UserPages/NovelDetailedView'))

//author
const AuthorHomePage = lazy(() => import('./pages/AuthorPages/AuthorHome'))
const AuthorCreatePage = lazy(() => import('./pages/AuthorPages/AuthorCreateNovel'))
const AuthorNovelPage = lazy(() => import('./pages/AuthorPages/AuthorNovels'))
const AuthorNovelDetailPage = lazy(() => import('./pages/AuthorPages/AuthorNovelDetailsPage'))
const AuthorAddChapterPage = lazy(() => import('./pages/AuthorPages/AuthorAddChapterPage'))

//admin pages
const AdminLoginPage = lazy(() => import('./pages/AdminPages/adminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/AdminPages/adminDashboardPage'))
const AdminUserManagement = lazy(() => import('./pages/AdminPages/adminUsersPage'))
const AdminAuthorManagement = lazy(() => import('./pages/AdminPages/adminAuthorPage'))
const AdminGenrePage = lazy(() => import('./pages/AdminPages/adminGenrePage'))
const AdminNovelPage = lazy(() => import('./pages/AdminPages/adminNovelsPage'))

//404 notFound
const NotFound404 = lazy(() => import('./pages/404-Page'))



//........................................................................................
function App() {


  return (

    <div className="App">

      <Router>

        <Suspense fallback={<div className="flex items-center justify-center min-h-screen p-5 bg-blue-400 min-w-screen">

          <div className="flex space-x-2 animate-pulse">
            <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
          </div>

        </div>}>

          <Routes>

            {/* UserPart */}
            <Route exact path={Login} element={<LoginPage />} />
            <Route exact path={Signup} element={<SignupPage />} />
            <Route exact path={readerHome} element={<ReaderHomePage />} />
            <Route exact path={filter} element={<FilterNovelsPage />} />
            <Route exact path={novelDetailedView} element={<NovelDetailedPage />} />


            {/* AuthorPart */}
            < Route exact path={authorHome} element={<AuthorHomePage />} />
            <Route exact path={authorCreate} element={<AuthorCreatePage />} />
            <Route exact path={authorNovels} element={<AuthorNovelPage />} />
            <Route exact path={AuthorNovelDetails} element={<AuthorNovelDetailPage />} />
            <Route exact path={AuthorAddChapter} element={<AuthorAddChapterPage />} />


            {/* AdminPart */}
            <Route exact path={adminLogin} element={<AdminLoginPage />} />
            <Route exact path={adminDashboard} element={<AdminDashboardPage />} />
            <Route exact path={adminUserManagement} element={<AdminUserManagement />} />
            <Route exact path={adminAuthorManagement} element={<AdminAuthorManagement />} />
            <Route exact path={adminGenreManagement} element={<AdminGenrePage />} />
            <Route exact path={adminNovelManagement} element={<AdminNovelPage />} />

            <Route path='*' element={<NotFound404 />} />

          </Routes>

        </Suspense>

      </Router>

    </div >

  );

}

//...............................................................................................
export default App;
