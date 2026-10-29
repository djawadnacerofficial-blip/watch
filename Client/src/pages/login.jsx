import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [loginId, setLoginId] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [regUsername, setRegUsername] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPass, setRegPass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    async function loginHandler(e) {
        e.preventDefault();
        setError("");
        try {
            await login(loginId, loginPass);
            await refreshUser();
            navigate("/feed");
        } catch (err) {
            setError(err.message);
        }
    }

    async function regHandler(e) {
        e.preventDefault();
        setError("");
        try {
            await signup({
                username: regUsername,
                email: regEmail,
                password: regPass,
            });
            await refreshUser();
            navigate("/feed");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-hero">
                <span className="auth-hero-dot" aria-hidden="true" />
                <h1>watch</h1>
                <p>Rate. Discuss. Remember what you've seen.</p>
            </div>

            <section className="login-sec">
                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={loginHandler} className="card">
                    <h2>Log in</h2>
                    <input
                        onChange={(e) => setLoginId(e.target.value)}
                        className="id-input"
                        type="text"
                        placeholder="Username or email"
                        value={loginId}
                    />
                    <input
                        onChange={(e) => setLoginPass(e.target.value)}
                        className="pass-input"
                        type="password"
                        placeholder="Password"
                        value={loginPass}
                    />
                    <button type="submit">Log in</button>
                </form>

                <form onSubmit={regHandler} className="card">
                    <h2>Create account</h2>
                    <input
                        onChange={(e) => setRegUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        value={regUsername}
                    />
                    <input
                        onChange={(e) => setRegEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        value={regEmail}
                    />
                    <input
                        onChange={(e) => setRegPass(e.target.value)}
                        type="password"
                        placeholder="Password"
                        value={regPass}
                    />
                    <button type="submit">Sign up</button>
                </form>
            </section>
        </div>
    );
}
