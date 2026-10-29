import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/post.jsx";
import MovieCard from "../components/MovieCard";
import UserCard from "../components/UserCard";
import { getPosts } from "../api/postsApi";
import { useAuth } from "../context/AuthContext";

export default function Feed() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await getPosts();
                setPosts(data.posts || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    return (
        <>
            <Navbar user={user} />

            <main className="feed-page">
                <aside className="left-sidebar">
                    <h2>Recommended Movies</h2>
                    <MovieCard title="Dune" subtitle="Sci-Fi · 2021" rating="8.0" />
                    <MovieCard title="Dune" subtitle="Sci-Fi · 2021" rating="8.0" />
                    <MovieCard title="Dune" subtitle="Sci-Fi · 2021" rating="8.0" />
                </aside>

                <section className="feed">
                    {loading && <p>Loading posts...</p>}
                    {error && <p className="auth-error">{error}</p>}
                    {!loading && !error && posts.length === 0 && (
                        <p>No posts yet. Create one in the next phase.</p>
                    )}
                    {posts.map((post) => (
                        <Post
                            key={post.post_id}
                            postId={post.post_id}
                            username={post.username}
                            profilePhoto={post.profilePhoto}
                            createdAt={post.created_at}
                            text={post.post_txt}
                            movieName={post.movie_name}
                        />
                    ))}
                </section>

                <aside className="right-sidebar">
                    <h2>People You May Know</h2>
                    <UserCard username="alex" tags={["Sci-Fi", "Horror"]} />
                    <UserCard username="sarah" tags={["Drama", "Thriller"]} />
                    <UserCard username="mike" tags={["Comedy", "Action"]} />
                </aside>
            </main>
        </>
    );
}
