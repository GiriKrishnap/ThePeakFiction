//..............................................................................................
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//LINKS.........................................................................................
import {
  AuthorAddChapter,
  AuthorNovelDetails,
  Login, PaymentSuccessURL, Signup, adminAuthorManagement, adminDashboard, adminGenreManagement, adminLogin,
  adminNovelManagement,
  adminUserManagement, authorCreate, authorHome, authorNovels, filter, getNewUpdatedPost, getUpdatedUrl, myLibraryUrl, novelDetailedView, profileUrl, readNovel, readerHome, trendingUrl
} from './util/constants';
import { Toaster } from 'react-hot-toast';


//Pages.........................................................................................

//reader pages
const LoginPage = lazy(() => import('./pages/UserPages/LoginPage'));
const SignupPage = lazy(() => import('./pages/UserPages/SignupPage'))
const ReaderHomePage = lazy(() => import('./pages/UserPages/HomePage'))
const FilterNovelsPage = lazy(() => import('./pages/UserPages/FilterPage'))
const NovelDetailedPage = lazy(() => import('./pages/UserPages/NovelDetailedView'))
const ReadNovel = lazy(() => import('./pages/UserPages/ReadNovelPage'))
const ProfilePage = lazy(() => import('./pages/UserPages/ProfilePage'))
const UpdatedPage = lazy(() => import('./pages/UserPages/Updated'))
const TrendingPage = lazy(() => import('./pages/UserPages/TrendingPage'))
const LibraryPage = lazy(() => import('./pages/UserPages/LibraryPage'))

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
//payment Success
const PaymentSuccessPage = lazy(() => import('./pages/UserPages/paymentSuccess'))



//........................................................................................
function App() {


  return (

    <div className="App">
      <div><Toaster /></div>
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
            <Route exact path={readNovel} element={<ReadNovel />} />
            <Route exact path={profileUrl} element={<ProfilePage />} />
            <Route exact path={PaymentSuccessURL} element={<PaymentSuccessPage />} />
            <Route exact path={getUpdatedUrl} element={<UpdatedPage />} />
            <Route exact path={trendingUrl} element={<TrendingPage />} />
            <Route exact path={myLibraryUrl} element={<LibraryPage />} />


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
