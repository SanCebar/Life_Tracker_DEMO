import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./Register.css";

export default function Register({ user, setUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match"}))
      setIsLoading(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }
    
    const { data, error } = await apiClient.registerUser({ email: form.email, username: form.username, password: form.password }) 
    if (error) {
      setErrors((e) => ({ ...e, form: error}))
    }
    if (data?.user) {
      setUser(data.user)
      apiClient.setToken(data.token)
    }

    setIsLoading(false)
  };

  return (
    <div className="register">
      <h2>Sign Up</h2>
      {errors.form && <div className="error">{errors.form}</div>}
      <br />
      <div class="card">
        <div className="form">
          
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              placeholder="user123"
              value={form.username}
              onChange={handleOnInputChange}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password123"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="password123"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div>

          <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>

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
