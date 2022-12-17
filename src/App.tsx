import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login'
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  const [idNumber, setIdNumber] = useState('')

  const changeIdNumber = (idNumber: any) => {
    setIdNumber(idNumber)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <main className="form-signin">
            <Routes>
              <Route path="/" element={<Login changeIdNumber={changeIdNumber} />} />
              <Route path="/home" element={<Home idNumber={idNumber} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
