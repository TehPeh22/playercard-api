import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gallery from './Pages/Gallery';
import Landing from './Pages/Landing';
import Payment from './Pages/Payment';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRouting/Authentication';
import { AuthProvider } from './Context/AuthContext';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/gallery' element={<ProtectedRoute><Gallery/></ProtectedRoute>}/>         
            <Route path='/payment' element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
          </Routes>   
          <Footer/> 
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
