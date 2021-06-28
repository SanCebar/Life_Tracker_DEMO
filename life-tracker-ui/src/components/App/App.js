import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home"
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  const [user, setUser] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [errors, setErrors] = useState(null)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Home />} />
          <Route path="/exercises" element={<Home />} />
          <Route path="/nutrition" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
