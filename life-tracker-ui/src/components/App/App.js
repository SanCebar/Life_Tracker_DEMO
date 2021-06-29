import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home"
import Login from '../Login/Login';
import Register from '../Register/Register';
import Activity from '../Activity/Activity';

function App() {
  const [user, setUser] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [activityFeed, setActivityFeed] = useState({})
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    const fetchActivityFeed = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.activityFeed()
      if (error) {
        setErrors((e) => ({ ...e, db: error}))
        setActivityFeed({})
      }
      if (data?.stats) {
        setErrors(null)
        setActivityFeed(data.stats)
      } 

      setIsFetching(false)
    }

    fetchActivityFeed()
  }, [user])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity user={user} activityFeed={activityFeed} />} />
          <Route path="/exercises" element={<Home />} />
          <Route path="/nutrition" element={<Home />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
