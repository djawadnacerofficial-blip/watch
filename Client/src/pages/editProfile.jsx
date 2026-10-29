import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, updateMyProfile } from "../api/usersApi";

export default function EditProfile() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            try {
                const res = await getMyProfile();
                const user = res;

                setUsername(user.username || "");
                setBio(user.text_bio || "");
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    function handlePhotoChange(e) {
        const file = e.target.files[0];

        if (file) {
            setProfilePhoto(file);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setSaving(true);

            await updateMyProfile({
                username,
                textBio: bio
            });

            navigate("/profile");

        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <main className="edit-profile-page">

            <header className="edit-profile-header">
                <button
                    className="back-btn"
                    onClick={() => navigate("/profile")}
                >
                    ← Back
                </button>

                <div>
                    <h1>Edit profile</h1>
                    <p>Update the information shown on your profile.</p>
                </div>
            </header>


            <form
                className="edit-profile-form"
                onSubmit={handleSubmit}
            >

                {/* PROFILE PHOTO */}

                <section className="edit-profile-photo">

                    <div className="photo-preview">

                        {profilePhoto ? (
                            <img
                                src={URL.createObjectURL(profilePhoto)}
                                alt="New profile"
                            />
                        ) : (
                            <div className="photo-placeholder">
                                No photo
                            </div>
                        )}

                    </div>

                    <div>
                        <h3>Profile picture</h3>

                        <p>
                            Choose a new picture for your profile.
                        </p>

                        <label className="photo-btn">
                            Choose photo

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    </div>

                </section>


                {/* USERNAME */}

                <div className="edit-input-group">

                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </div>


                {/* BIO */}

                <div className="edit-input-group">

                    <label htmlFor="bio">
                        Bio
                    </label>

                    <textarea
                        id="bio"
                        rows="5"
                        maxLength="160"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell people a little about yourself..."
                    />

                    <span className="character-count">
                        {bio.length}/160
                    </span>

                </div>


                {/* ACTIONS */}

                <div className="edit-profile-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/profile")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-profile-btn"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save changes"}
                    </button>

                </div>

            </form>

        </main>
    );
}