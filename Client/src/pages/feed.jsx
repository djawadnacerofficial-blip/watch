import Navbar from "../components/Navbar";
import Post from "../components/Post";
import MovieCard from "../components/MovieCard";
import UserCard from "../components/UserCard";

export default function Feed() {

    return (
        <>
            <Navbar />

            <main className="feed-page">

                <aside className="left-sidebar">

                    <h2>Recommended Movies</h2>

                    <MovieCard
                        title="Dune"
                        genre="Sci-Fi"
                        year="2021"
                        rating="8.0"
                    />

                    <MovieCard
                        title="Interstellar"
                        genre="Sci-Fi"
                        year="2014"
                        rating="8.7"
                    />

                    <MovieCard
                        title="The Batman"
                        genre="Crime"
                        year="2022"
                        rating="7.8"
                    />

                </aside>


                <section className="feed">

                    <Post />
                    <Post />
                    <Post />
                    <Post />

                </section>


                <aside className="right-sidebar">

                    <h2>People You May Know</h2>

                    <UserCard
                        username="alex"
                        tags={["Sci-Fi", "Horror"]}
                    />

                    <UserCard
                        username="sarah"
                        tags={["Drama", "Thriller"]}
                    />

                    <UserCard
                        username="mike"
                        tags={["Comedy", "Action"]}
                    />

                </aside>

            </main>
        </>
    );
}