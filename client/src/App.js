import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login.js';
import Signup from './component/Signup/Signup.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavMenu from './component/NavMenu/NavMenu.jsx';
import ListQuestions from './component/ListQuestions/ListQuestions.jsx';




function App() {
  return (
    <Router>
    <NavMenu/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/> } />
        <Route path="/questions" element={<ListQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
