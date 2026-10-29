import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import UserCard from "../components/UserCard";
import Post from "../components/post";
import { useAuth } from "../context/AuthContext";
import { searchApi } from "../api/searchApi";

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const { user } = useAuth();

    const [movies, setMovies] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) {
            setMovies([]);
            setProfiles([]);
            setPosts([]);
            return;
        }

        async function runSearch() {
            setLoading(true);
            setError("");
            try {
                const { moviesR, usersR, postsR } = await searchApi(query);
                setMovies(moviesR || []);
                setProfiles(usersR || []);
                setPosts(postsR || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        runSearch();
    }, [query]);

    const nothingFound =
        !loading &&
        !error &&
        query &&
        movies.length === 0 &&
        profiles.length === 0 &&
        posts.length === 0;

    return (
        <>
            <Navbar user={user} />
            <main className="search-page">
                <h1 className="search-title">Results for "{query}"</h1>

                {loading && <p className="search-status">Searching...</p>}
                {error && <p className="auth-error">{error}</p>}
                {nothingFound && <p className="search-status">No results found.</p>}

                <div className="search-grid">
                    <section className="search-column search-movies">
                        <h2>Movies</h2>
                        <div className="movie-list">
                            {movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    title={movie.title}
                                    poster={
                                        movie.poster
                                            ? `https://image.tmdb.org/t/p/w200${movie.poster}`
                                            : null
                                    }
                                    subtitle={movie.releaseDate?.slice(0, 4)}
                                    rating={movie.rating?.toFixed(1)}
                                />
                            ))}
                        </div>
                        {movies.length === 0 && !loading && (
                            <p className="empty-note">No movies</p>
                        )}
                    </section>

                    <section className="search-column search-posts">
                        <h2>Posts</h2>
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
                        {posts.length === 0 && !loading && (
                            <p className="empty-note">No posts</p>
                        )}
                    </section>

                    <section className="search-column search-users">
                        <h2>Users</h2>
                        {profiles.map((p) => (
                            <UserCard
                                key={p.userID}
                                userId={p.userID}
                                username={p.username}
                                profilePhoto={p.profilePhoto}
                                textBio={p.text_bio}
                            />
                        ))}
                        {profiles.length === 0 && !loading && (
                            <p className="empty-note">No users</p>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}
