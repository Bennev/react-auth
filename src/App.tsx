import { useEffect} from 'react';
import './App.css';
import Login from './pages/Login'
import Nav from './components/Nav';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register'
import Company from './pages/Company';
import Location from './pages/Location';
import Ticket from './pages/Ticket';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
  const { user } = useSelector((state: RootState) => state.Users);
  const navigate = useNavigate();

  useEffect(()=> {
    if(!user?.id) {
      navigate("/")
    } 
  },[user])

  return (
    <div className="App">
        <Nav />

        <main>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tickets" element={<Ticket />} />
              <Route path="/company/:id" element={<Company />} />
              <Route path="/company/:id/location/:idL" element={<Location />} />
            </Routes>
        </main>
    </div>
  )
}

export default App;
