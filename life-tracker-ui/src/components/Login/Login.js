import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import "./Login.css"

export default function Login ({ user, setUser }) {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
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

        try {
            // const res
        } catch(err) {
            console.log(err)
            setErrors((e) => ({ ...e, form: "Invalid username/password combination"}))
        } finally {
            setIsLoading(false)
        }
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