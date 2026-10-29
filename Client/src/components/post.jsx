import PillBadge from "./pillBadge";
import Comments from "./Comments";

function formatDate(value) {
    if (!value) return "";
    return new Date(value).toLocaleDateString();
}

export default function Post({
    postId,
    username,
    profilePhoto,
    createdAt,
    text,
    movieName,
}) {
    const initial = username?.[0]?.toUpperCase() || "?";

    return (
        <section className="post">
            <div className="poster">
                {profilePhoto ? (
                    <img className="post-img" src={profilePhoto} alt={`${username} avatar`} />
                ) : (
                    <div className="post-img post-img-fallback" aria-hidden="true">
                        {initial}
                    </div>
                )}
                <div className="poster-data">
                    <span className="post-username">{username}</span>
                    <p className="created-at">{formatDate(createdAt)}</p>
                </div>
                {movieName && (
                    <div className="post-tags">
                        <PillBadge txt={movieName} />
                    </div>
                )}
            </div>
            <div className="post-txt">{text}</div>
            <Comments postId={postId} />
        </section>
    );
}