import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Pages
import LoginPage from './pages/UserPages/LoginPage'
import SignupPage from './pages/UserPages/SignupPage';
// import HomePage from './pages/UserPages/HomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* userPart */}
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
