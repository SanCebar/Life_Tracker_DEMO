import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import "./Login.css"

export default function Login () {
    return (
        <div className="login">
            <h2>Login</h2>
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
                            placeholder="password"
                            // value={form.email}
                            // onChange={handleOnInputChange}
                        />
                    </div>
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