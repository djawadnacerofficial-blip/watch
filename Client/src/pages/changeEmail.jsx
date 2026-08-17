import { useState } from "react";

export default function ChangeEmail() {

    const [email, setEmail] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        console.log("New email:", email);
    }

    return (
        <main className="settings-form-page">

            <header className="settings-form-header">
                <h1>Change email</h1>

                <p>
                    Update the email address associated with your account.
                </p>
            </header>

            <form
                className="settings-form"
                onSubmit={handleSubmit}
            >

                <div className="input-group">

                    <label htmlFor="email">
                        New email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your new email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <button
                    className="settings-submit"
                    type="submit"
                >
                    Change email
                </button>

            </form>

        </main>
    );
}