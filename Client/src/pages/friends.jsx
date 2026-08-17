import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Friends() {
    const { username } = useParams();
    const navigate = useNavigate();

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFriends() {
            try {
                // Later:
                // const data = await getUserFriends(username);
                // setFriends(data.friends);

                // Temporary data
                setFriends([
                    {
                        username: "alex",
                        profilePhoto: "https://i.pravatar.cc/150?img=1",
                        bio: "Movie lover 🎬"
                    },
                    {
                        username: "sarah",
                        profilePhoto: "https://i.pravatar.cc/150?img=2",
                        bio: "Horror & sci-fi"
                    },
                    {
                        username: "mike",
                        profilePhoto: "https://i.pravatar.cc/150?img=3",
                        bio: "Always watching something"
                    }
                ]);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadFriends();
    }, [username]);

    return (
        <main className="friends-page">

            <header className="friends-header">

                <button
                    className="friends-back"
                    onClick={() => navigate(-1)}
                >
                    ←
                </button>

                <div>
                    <h1>{username}'s Friends</h1>
                    <p>
                        {friends.length} friends
                    </p>
                </div>

            </header>


            {loading ? (
                <p className="friends-status">
                    Loading friends...
                </p>
            ) : friends.length === 0 ? (
                <p className="friends-status">
                    No friends yet.
                </p>
            ) : (

                <section className="friends-list">

                    {friends.map((friend) => (

                        <article
                            className="friend-card"
                            key={friend.username}
                            onClick={() =>
                                navigate(`/profile/${friend.username}`)
                            }
                        >

                            <img
                                className="friend-img"
                                src={friend.profilePhoto}
                                alt={`${friend.username}'s profile`}
                            />

                            <div className="friend-info">

                                <h2>
                                    {friend.username}
                                </h2>

                                <p>
                                    {friend.bio}
                                </p>

                            </div>

                            <span className="friend-arrow">
                                →
                            </span>

                        </article>

                    ))}

                </section>

            )}

        </main>
    );
}