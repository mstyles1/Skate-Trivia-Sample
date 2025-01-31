import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login.js';
import Signup from './component/Signup/Signup.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavMenu from './component/NavMenu/NavMenu.jsx';
import ListQuestions from './component/ListQuestions/ListQuestions.jsx';

function App() {
  const [user, setUser] = useState(null);  // Initialize user state
  
  return (
    <Router>
      <NavMenu user={user} /> {/* Pass user state to NavMenu */}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/questions" element={<ListQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;