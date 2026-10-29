import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        navigate(`/search?q=${encodeURIComponent(q)}`);
    }

    const initial = user?.username?.[0]?.toUpperCase() || "?";

    return (
        <nav className="navbar">
            <button
                className="settings-btn"
                onClick={() => navigate("/settings")}
                aria-label="Settings"
            >
                ⚙
            </button>

            <form className="nav-search" onSubmit={handleSearch}>
                <span className="search-icon">⌕</span>
                <input
                    type="text"
                    placeholder="Search movies, users, posts..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>

            <button
                className="profile-btn"
                onClick={() => navigate("/profile")}
                aria-label="Profile"
            >
                {user?.profilePhoto ? (
                    <img className="nav-profile" src={user.profilePhoto} alt="Profile" />
                ) : (
                    <span className="nav-profile nav-profile-fallback">{initial}</span>
                )}
            </button>
        </nav>
    );
}
