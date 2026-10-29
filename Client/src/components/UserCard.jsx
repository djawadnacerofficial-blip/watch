export default function UserCard({ userId, username, profilePhoto, textBio, onFollow, isFollowing }) {
    const initial = username?.[0]?.toUpperCase() || "?";

    return (
        <div className="user-card">
            {profilePhoto ? (
                <img className="user-card-img" src={profilePhoto} alt={username} />
            ) : (
                <div className="user-card-img user-card-img-fallback" aria-hidden="true">
                    {initial}
                </div>
            )}
            <div className="user-card-info">
                <h3>{username}</h3>
                {textBio && <p className="user-card-bio">{textBio}</p>}
            </div>
            <button
                className={isFollowing ? "btn-following" : "btn-follow"}
                onClick={() => onFollow?.(userId)}
            >
                {isFollowing ? "Following" : "Follow"}
            </button>
        </div>
    );
}
