import { Link } from "react-router-dom"
import "./Activity.css"

export default function Activity({ user, activityFeed }) {
    return (
        <div className="Activity">
            {Object.keys(user).length === 0 ?
                <>
                <h1>Unauthorized User</h1>
                <p>You can register for an account <Link to="/register">here</Link></p>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                </> 
                :
                <>
                <h1>Activity Feed</h1>
                <div className="activity-feed">
                    <div className="activity-box e">
                        <span className="e-minutes">Total Exercise Minutes: {activityFeed.exerciseMin} </span>
                    </div>
                    
                    <div className="activity-box n">
                        <span className="n-calories">Average Calorie Consumption: </span>
                    </div>
                </div>
                </>
            }
        </div>
    )
}