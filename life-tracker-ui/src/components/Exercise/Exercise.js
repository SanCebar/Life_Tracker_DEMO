import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "contexts/auth";
import moment from "moment";
import "./Exercise.css";

export default function Exercise() {
  const { user } = useAuthContext();
  const [exerciseFeed, setExerciseFeed] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    duration: 0,
    intensity: 0,
  });

  useEffect(() => {
    const fetchExerciseFeed = async () => {
      setIsFetching(true);
      const { data, error } = await apiClient.exerciseFeed();
      if (error) {
        setErrors((e) => ({ ...e, db: error }));
        setExerciseFeed([]);
      }
      if (data?.exercises) {
        setErrors(null);
        setExerciseFeed(data.exercises);
      }

      setIsFetching(false);
    };
    if (user?.username) {
      fetchExerciseFeed();
    }
  }, [user]);

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsFetching(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.logExercise({
      name: form.name,
      category: form.category,
      duration: form.duration,
      intensity: form.intensity
    });
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }
    if (data) {
        setExerciseFeed(oldX => [ data.exercise, ...oldX ] )
    }
    setIsFetching(false);
  };

  return (
    <div className="Exercise">
      {Object.keys(user).length === 0 ? (
        <>
          <h1>Unauthorized User</h1>
          <p>
            You can register for an account <Link to="/register">here</Link>
          </p>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </>
      ) : (
        <>
          <h1>Exercise Feed</h1>
          <div className="log-x-card">
            {errors?.form && <div className="error">{errors.form}</div>}
            <button className="log-x-btn">Log New Exercise</button>
            <div className="x-form">
              <div className="input-field">
                <label htmlFor="x-name">Exercise Name</label>
                <input
                  type="name"
                  name="name"
                  placeholder="boxing"
                  value={form.name}
                  onChange={handleOnInputChange}
                />
                {/* {errors.email && <div className="error">{errors.email}</div>} */}
              </div>

              <div className="input-field">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="aerobic"
                  value={form.category}
                  onChange={handleOnInputChange}
                />
                {/* {errors.email && <div className="error">{errors.email}</div>} */}
              </div>

              <div className="input-field">
                <label htmlFor="duration">Duration</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="10"
                  value={form.duration}
                  onChange={handleOnInputChange}
                />
                {/* {errors.email && <div className="error">{errors.email}</div>} */}
              </div>

              <div className="input-field">
                <label htmlFor="intensity">Intensity</label>
                <input
                  type="number"
                  name="intensity"
                  placeholder="3"
                  value={form.intensity}
                  onChange={handleOnInputChange}
                />
                {/* {errors.email && <div className="error">{errors.email}</div>} */}
              </div>

              <button
                className="btn"
                disabled={isFetching}
                onClick={handleOnSubmit}
              >
                {isFetching ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </>
      )}

      <div className="x-feed">
        {Object.keys(user).length === 0
          ? null
          : exerciseFeed?.map((x) => (
              <div className="x-card" key={x.id}>
                <p>{moment(x.timestamp).format("lll")}</p>
                <div className="x-card-content">
                  <div className="x-heading">
                    <span>
                      <h3>{x.name}</h3>
                    </span>
                    <span className="x-category">{x.category}</span>
                  </div>
                  <span>Duration: {x.duration}</span>
                  <span>Intensity: {x.intensity}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
