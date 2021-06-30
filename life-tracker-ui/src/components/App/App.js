import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Activity, Exercise, Home, Login, Navbar, Nutrition, Register } from "components"
import { AuthContextProvider, useAuthContext } from "contexts/auth"
import apiClient from "services/apiClient";
import './App.css';

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

function App() {
  const {user, setUser} = useAuthContext()
  const [isFetching, setIsFetching] = useState(false)
  const [activityFeed, setActivityFeed] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivityFeed = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.activityFeed()
      if (error) {
        setError((e) => ({ ...e, db: error}))
        setActivityFeed({})
      }
      if (data?.stats) {
        setError(null)
        setActivityFeed(data.stats)
      } 

      setIsFetching(false)
    }

    fetchActivityFeed()
  }, [user])

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { data } = await apiClient.fetchUserFromToken()
  //     if (data) {
  //       setUser(data.user)
  //     }
  //   }

  //   const token = 
  // })

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity activityFeed={activityFeed} />} />
          <Route path="/exercises" element={<Exercise />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// export default App;
