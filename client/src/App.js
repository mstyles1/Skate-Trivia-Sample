import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login';
import Signup from './component/Signup/Signup';
import NavMenu from './component/NavMenu/NavMenu.jsx';
import ListQuestions from './component/ListQuestions/ListQuestions.jsx';



function App() {
  const [user, setUser] = useState ({
    user_id: 1,
    user_name: ""
  })

  return (
    <Router>
      <NavMenu user={user} />
      <Routes>
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/signup" element={<Signup /> } />
        <Route path="/questions" element={!user.user_id ? <Login user={user} setUser={setUser} /> : <ListQuestions user={user} /> } />

      </Routes>
    </Router>
  );
}

export default App;
