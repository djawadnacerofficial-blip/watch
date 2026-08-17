import { useEffect, useState } from "react";
import { getMyProfile } from "../api/usersApi";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PillBadge from "../components/PillBadge";
import Post from "../components/Post";

export default function Profile() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        async function loadProfile() {
            const data = await getMyProfile();

            setUser(data);
        }

        loadProfile();

    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar user={user} />

            <main className="profile-page">

                {/* PROFILE HEADER */}

                <section className="profile-header">

                    <img
                        className="profile-avatar"
                        src={user.profilePhoto}
                        alt="Profile"
                    />

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