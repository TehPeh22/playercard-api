import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Challenges from './Pages/Challenges';
import ProtectedRoute from './Components/ProtectedRouting/Authentication';
import { AuthProvider } from './Context/AuthContext';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='/challenges' element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;