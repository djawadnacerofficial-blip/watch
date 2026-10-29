import { useEffect, useState } from "react";
import { getComments, createComment } from "../api/postsApi";
import { useAuth } from "../context/AuthContext";

function formatDate(value) {
    if (!value) return "";
    return new Date(value).toLocaleDateString();
}

// Handles either a raw pg result ({ rows: [...] }) or a plain row object,
// so the UI doesn't silently break if the backend response shape shifts.
function normalizeComment(raw) {
    if (raw && Array.isArray(raw.rows)) return raw.rows[0];
    return raw;
}

export default function Comments({ postId }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        async function load() {
            try {
                const data = await getComments(postId);
                if (!ignore) setComments(data.comments || []);
            } finally {
                if (!ignore) setLoading(false);
            }
        }
        load();
        return () => {
            ignore = true;
        };
    }, [postId]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim()) return;

        const payload = {
            comment_txt: text,
            ...(replyTo && { parent_comment_id: replyTo }),
        };

        const res = await createComment(postId, payload);
        const created = normalizeComment(res.newComment);
        if (!created) return;

        // The INSERT...RETURNING * on creation won't include username/photo
        // (only the GET query joins users) — fill it in from the logged-in
        // user so the new comment renders immediately, not just after reload.
        const optimistic = {
            ...created,
            username: created.username ?? user?.username,
            profilePhoto: created.profilePhoto ?? user?.profilePhoto,
        };

        setComments((prev) => [...prev, optimistic]);
        setText("");
        setReplyTo(null);
    }

    const topLevel = comments.filter((c) => c && !c.parent_comment_id);
    const repliesOf = (id) =>
        comments.filter((c) => c && c.parent_comment_id === id);

    function renderComment(c, isReply = false) {
        const initial = c.username?.[0]?.toUpperCase() || "?";
        return (
            <div
                key={c.comment_id ?? `${c.comment_txt}-${c.created_at}`}
                className={isReply ? "comment comment-reply" : "comment"}
            >
                <div className="comment-header">
                    {c.profilePhoto ? (
                        <img
                            className="comment-avatar"
                            src={c.profilePhoto}
                            alt={c.username}
                        />
                    ) : (
                        <span className="comment-avatar comment-avatar-fallback">
                            {initial}
                        </span>
                    )}
                    <span className="comment-username">{c.username}</span>
                    <span className="comment-date">{formatDate(c.created_at)}</span>
                </div>
                <p className="comment-text">{c.comment_txt}</p>
                {!isReply && (
                    <button
                        className="comment-reply-btn"
                        onClick={() => setReplyTo(c.comment_id)}
                    >
                        Reply
                    </button>
                )}
                {!isReply && repliesOf(c.comment_id).map((r) => renderComment(r, true))}
            </div>
        );
    }

    return (
        <div className="comments">
            {loading && <p className="comments-loading">Loading comments...</p>}
            {topLevel.map((c) => renderComment(c))}

            <form onSubmit={handleSubmit} className="comment-form">
                {replyTo && (
                    <p className="replying-note">
                        Replying to a comment{" "}
                        <button type="button" onClick={() => setReplyTo(null)}>
                            cancel
                        </button>
                    </p>
                )}
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}
