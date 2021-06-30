import apiClient from "../../services/apiClient"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuthContext } from "contexts/auth"
import "./Exercise.css"

export default function Exercise() {

    const {user} = useAuthContext()
    const [exerciseFeed, setExerciseFeed] = useState([])
    const [errors, setErrors] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        const fetchExerciseFeed = async () => {
          setIsFetching(true)
          const { data, error } = await apiClient.exerciseFeed()
          if (error) {
            setErrors((e) => ({ ...e, db: error}))
            setExerciseFeed([])
          }
          if (data?.exercises) {
            setErrors(null)
            setExerciseFeed(data.exercises)
          } 
    
          setIsFetching(false)
        }
    
        fetchExerciseFeed()
    }, [user])

    return (
        <div className="Exercise">
            {Object.keys(user).length === 0 ? (
                <>
                <h1>Unauthorized User</h1>
                <p>You can register for an account <Link to="/register">here</Link></p>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                </> 
            ): <h1>Exercise Feed</h1>}
            <div className="x-feed">
                {Object.keys(user).length === 0 ? null : 
                    exerciseFeed?.map((x) => (
                        <div className="x-card" key={x.id}>
                            <span>{x.name}</span>
                            <span>{x.category}</span>
                            <span>{x.duration}</span>
                            <span>{x.intensity}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}