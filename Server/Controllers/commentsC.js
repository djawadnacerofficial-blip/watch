import {
    getCommentsM,
    createCommentM,
    updateCommentM,
    deleteCommentM
} from "../Models/commentsM.js";

export async function getCommentsC(req, res) {
    try {
        const { post_id } = req.params;

        const comments = await getCommentsM(post_id);

        return res.status(200).json({
            msg: "Comments retrieved successfully.",
            comments
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error while getting comments."
        });
    }
}

export async function createCommentC(req, res) {
    try {
        const { post_id } = req.params;

        const comment = {
            post_id,
            ...req.body
        };

        const newComment = await createCommentM(
            comment,
            req.session.userId
        );

        return res.status(201).json({
            msg: "Comment created successfully.",
            newComment
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error while creating comment."
        });
    }
}

export async function updateCommentC(req, res) {
    try {
        const { comment_id } = req.params;

        const updatedComment = await updateCommentM(
            comment_id,
            req.body,
            req.session.userId
                    
        );

        return res.status(200).json({
            msg: "Comment updated successfully.",
            updatedComment
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error while updating comment."
        });
    }
}

export async function deleteCommentC(req, res) {
    try {
        const { comment_id } = req.params;

        const deletedComment = await deleteCommentM(
            comment_id,
            req.session.userId
            
        );

        console.log(deletedComment)
        return res.status(200).json({
            msg: "Comment deleted successfully.",
            deletedComment
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error while deleting comment."
        });
    }
}