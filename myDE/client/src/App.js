import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import PythonRunner from './components/PythonRunner';
import JavaRunner from './components/JavaRunner';
import CppRunner from './components/CppRunner';
import CsharpRunner from './components/CsharpRunner';
import NodeRunner from './components/NodeRunner';
import RustRunner from './components/RustRunner';
import RRunner from './components/RRunner';
import Navbar from './components/Navbar'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lang" element={<Navigate replace to="/lang/python" />} />
          <Route path="/lang/python" element={<PythonRunner />} />
          <Route path="/lang/java" element={<JavaRunner />} />
          <Route path="/lang/cpp" element={<CppRunner />} />
          <Route path="/lang/csharp" element={<CsharpRunner />} />
          <Route path="/lang/node" element={<NodeRunner />} />
          <Route path="/lang/rust" element={<RustRunner />} />
          <Route path="/lang/r" element={<RRunner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
