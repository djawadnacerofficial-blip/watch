import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
    const navigate = useNavigate();

    return (
        <nav className="navbar">

            <button
                className="settings-btn"
                onClick={() => navigate("/settings")}
                aria-label="Settings"
            >
                ⚙
            </button>

            <div className="nav-search">
                <span className="search-icon">⌕</span>

                <input
                    type="text"
                    placeholder="Search movies, users, posts..."
                />
            </div>

            <button
                className="profile-btn"
                onClick={() => navigate("/profile")}
                aria-label="Profile"
            >
                <img
                    className="nav-profile"
                    src={user?.profilePhoto}
                    alt="Profile"
                />
            </button>

        </nav>
    );
}