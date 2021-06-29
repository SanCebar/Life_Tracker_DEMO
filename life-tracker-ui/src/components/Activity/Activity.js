import "./Activity.css"

export default function Activity({ user, activityFeed }) {
    console.log(activityFeed)
    return (
        <div className="Activity">
            <h1>Activity Feed</h1>
            <span className="e-minutes">Total Exercise Minutes: {activityFeed.exerciseMin} </span>
        </div>
    )
}