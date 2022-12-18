import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login'
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register'
import Company from './pages/Company';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <main>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/ticket" element={<Register />} />
              <Route path="/company" element={<Company />} />
              <Route path="/location" element={<Register />} />
            </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
