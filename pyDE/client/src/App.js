import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Interpreter from './components/Interpreter';
import Navbar from './components/Navbar'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/interpreter" element={<Interpreter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
