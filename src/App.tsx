import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login'
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register'
import Company from './pages/Company';
import Location from './pages/Location';
import Ticket from './pages/Ticket';

function App() {
  const [userId, setUserId] = useState("")

  const handleUserId = (id: string) => {
    setUserId(id)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <main>
            <Routes>
              <Route path="/" element={<Login handleUserId={handleUserId} />} />
              <Route path="/home" element={<Home userId={userId} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tickets" element={<Ticket />} />
              <Route path="/company" element={<Company />} />
              <Route path="/location" element={<Location />} />
            </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
