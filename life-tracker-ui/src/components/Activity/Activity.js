import { Link } from "react-router-dom"
import { useAuthContext } from "contexts/auth"
import "./Activity.css"

export default function Activity({ activityFeed }) {
    const { user } = useAuthContext()
    console.log("Inside Activity: activityFeed...", activityFeed)

    return (
        <div className="Activity">
            {Object.keys(user).length === 0 ?
                <>
                <h1>Unauthorized User</h1>
                <p>You can register for an account <Link to="/register">here</Link></p>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                </> 
                : <h1>Activity Feed</h1>
            }
            {/* {activityFeed && user.username ?
                <>
                <h2>No available data.</h2>
                <p>Try logging some exercises <Link to="/exercises">here</Link></p>
                </> : null
            } */}
            {Object.keys(activityFeed).length !== 0 && !user.username ?
                <div className="activity-feed">
                    <div className="activity-box e">
                        <span className="e-minutes">Total Exercise Minutes: {activityFeed.exerciseMin} </span>
                    </div>
                    
                    <div className="activity-box n">
                        <span className="n-calories">Average Calorie Consumption: </span>
                    </div>
                </div> : null
            }
            
                
        </div>
    )
}