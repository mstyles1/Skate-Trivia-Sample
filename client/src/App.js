import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login.js';
import Signup from './component/Signup/Signup.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavMenu from './component/NavMenu/NavMenu.jsx';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/> } />
      </Routes>
    </Router>
  );
}

export default App;
