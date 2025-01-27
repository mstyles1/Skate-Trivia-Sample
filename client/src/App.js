import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login.js';
import Signup from './component/Signup/Signup.js';
import NavMenu from './component/NavMenu/NavMenu.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListQuestions from './component/ListQuestions/ListQuestions.jsx';



function App() {
  const [user, setUser] = useState ({
    user_id: 1,
    user_name: "user"
  })

  return (
    <Router>
      <NavMenu user={user} />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/> } />
        {/* <Route path="/questions" element={!user.user_id ? <Login user={user} setUser={setUser} /> : <ListQuestions user={user} /> } /> */}

      </Routes>
    </Router>
  );
}

export default App;
