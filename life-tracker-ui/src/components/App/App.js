import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Activity, Exercise, Home, Login, Navbar, Nutrition, Register } from "components"
import apiClient from "services/apiClient";
import './App.css';

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
          <Route path="/exercises" element={<Exercise user={user} />} />
          <Route path="/nutrition" element={<Nutrition user={user} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
