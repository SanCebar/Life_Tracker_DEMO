import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient"
import "./Login.css"

export default function Login ({ user, setUser }) {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: ""
    })

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
                setErrors((e) => ({ ...e, email: "Please enter a valid email."}))
            } else {
                setErrors((e) => ({ ...e, email: null}))
            }
        }

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async () => {
        setIsLoading(true)
        setErrors((e) => ({ ...e, form: null}))

        const { data, error } = await apiClient.loginUser({ email: form.email, password: form.password }) 
        if (error) {
          setErrors((e) => ({ ...e, form: error}))
        }
        if (data?.user) {
          setUser(data.user)
          apiClient.setToken(data.token)
          navigate("/activity")
        }

        setIsLoading(false)
    }

    return (
        <div className="login">
            <h2>Login</h2>
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

                    {/* <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="username"
                            name="username"
                            placeholder="user123"
                            value={form.username}
                            onChange={handleOnInputChange}
                        />
                        {errors.username && <div className="error">{errors.username}</div>}
                    </div> */}

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

                    <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>

                </div>
                <div className="footer">
                    <p>
                        Don't have an account? Sign up <Link to="/register">here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}