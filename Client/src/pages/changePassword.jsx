import { useState } from "react";

export default function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        console.log("Changing password...");
    }

    return (
        <main className="settings-form-page">

            <header className="settings-form-header">

                <h1>Change password</h1>

                <p>
                    Choose a new password to keep your account secure.
                </p>

            </header>

            <form
                className="settings-form"
                onSubmit={handleSubmit}
            >

                <div className="input-group">

                    <label htmlFor="current-password">
                        Current password
                    </label>

                    <input
                        id="current-password"
                        type="password"
                        placeholder="Enter your current password"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                    />

                </div>


                <div className="input-group">

                    <label htmlFor="new-password">
                        New password
                    </label>

                    <input
                        id="new-password"
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                    />

                </div>


                <div className="input-group">

                    <label htmlFor="confirm-password">
                        Confirm new password
                    </label>

                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                </div>


                <button
                    className="settings-submit"
                    type="submit"
                >
                    Change password
                </button>

            </form>

        </main>
    );
}