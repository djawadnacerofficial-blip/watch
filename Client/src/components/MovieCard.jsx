export default function MovieCard({ title, poster, subtitle, rating, overview, onClick }) {
    return (
        <div className="movie-card" onClick={onClick}>
            <div className="movie-card-poster">
                <img src={poster || "https://placehold.co/100x140"} alt={title} />
                {rating != null && <span className="movie-rating-chip">{rating}</span>}
            </div>
            <div className="movie-card-body">
                <h3>{title}</h3>
                {subtitle && <p className="movie-card-subtitle">{subtitle}</p>}
                {overview && <p className="movie-card-overview">{overview}</p>}
            </div>
        </div>
    );
}
