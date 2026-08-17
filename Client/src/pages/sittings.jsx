import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

export default function Settings() {
    const navigate = useNavigate();

    const [theme, setTheme] = useState("dark");

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="settings-page">

            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account and preferences.</p>
            </div>


            <section className="settings-section">

                <h2>Account</h2>

                <button
                    className="settings-row"
                    onClick={() => navigate("/settings/email")}
                >
                    <div>
                        <h3>Change email</h3>
                        <p>Update the email address connected to your account.</p>
                    </div>

                    <span>›</span>
                </button>


                <button
                    className="settings-row"
                    onClick={() => navigate("/settings/password")}
                >
                    <div>
                        <h3>Change password</h3>
                        <p>Update your account password.</p>
                    </div>

                    <span>›</span>
                </button>

            </section>


            <section className="settings-section">

                <h2>Appearance</h2>

                <div className="theme-setting">

                    <div>
                        <h3>Theme</h3>
                        <p>Choose how the application looks.</p>
                    </div>

                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>

                </div>

            </section>


            <section className="settings-section danger-section">

                <h2>Account actions</h2>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Log out
                </button>

            </section>

        </main>
    );
}