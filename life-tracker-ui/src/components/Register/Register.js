import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

  return (
    <div className="register">
      <h2>Sign Up</h2>
      {errors.form && <div className="error">{errors.form}</div>}
      <br/>
      <div class="card">
        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              // value={form.email}
              // onChange={handleOnInputChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password123"
              // value={form.email}
              // onChange={handleOnInputChange}
            />
          </div>
          <button>{isLoading ? "Loading..." : "Sign Up"}</button>
        </div>
        <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
