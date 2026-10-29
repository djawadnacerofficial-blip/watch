import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import PillBadge from "../components/pillBadge.jsx";
import Post from "../components/post.jsx";

export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar user={user} />

            <main className="profile-page">

                {/* PROFILE HEADER */}

                <section className="profile-header">

                    {user.profilePhoto ? (
                        <img
                            className="profile-avatar"
                            src={user.profilePhoto}
                            alt="Profile"
                        />
                    ) : (
                        <div className="profile-avatar post-img-fallback">
                            {user.username?.[0]?.toUpperCase()}
                        </div>
                    )}

                    <div className="profile-main">

                        <div className="profile-name-row">

                            <div>
                                <h1>
                                    {user.username}
                                </h1>

                                <p>
                                    @{user.username}
                                </p>
                            </div>

                            <button
                                className="edit-profile-btn"
                                onClick={() => navigate("/profile/edit")}
                            >
                                Edit Profile
                            </button>

                        </div>


                        <p className="profile-bio">
                            {user.text_bio}
                        </p>


                        <div className="profile-stats">

                            <div >
                                <strong>128</strong>
                                <button >Friends</button>
                            </div>

                            <div>
                                <strong>34</strong>
                                <span>Posts</span>
                            </div>

                            <div>
                                <strong>52</strong>
                                <span>Reviews</span>
                            </div>

                        </div>


                        <div className="profile-tags">

                            {user.taste_tags?.map((tag, index) => (
                                <PillBadge
                                    key={index}
                                    txt={tag}
                                />
                            ))}

                        </div>

                    </div>

                </section>


                {/* DASHBOARD */}

                <section className="profile-dashboard">

                    <div className="profile-posts">

                        <h2>Recent Posts</h2>

                        <Post />
                        <Post />

                    </div>


                    <aside className="favorite-movies">

                        <h2>Favorite Movies</h2>

                        <div className="favorite-movie">
                            <span>🎬</span>
                            <p>Dune</p>
                        </div>

                        <div className="favorite-movie">
                            <span>🎬</span>
                            <p>Interstellar</p>
                        </div>

                        <div className="favorite-movie">
                            <span>🎬</span>
                            <p>Blade Runner 2049</p>
                        </div>

                    </aside>

                </section>

            </main>
        </>
    );
}