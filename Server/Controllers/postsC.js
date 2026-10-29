import { getAllPostsM, createPostM, updatePostM, deletePostM } from '../Models/postsM.js'


export async function getPosts(req, res) {
    try {

        const result = await getAllPostsM()

        res.status(200).json({ msg: "posts arrived", posts: result.rows })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
}

export async function createPost(req, res) {
    try {
        const newPost = await createPostM(req.session.userId, req.body)
        res.status(200).json({msg: "post added", newPost})
        
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error while createPost at postsC.js"})
    }
}

export async function updatePost(req, res) {
    try {
        const { post_id } = req.params;

        const updatedPost = await updatePostM(
            req.session.userId,
            post_id,
            req.body
        );

        return res.status(200).json({
            msg: "post has been updated",
            updatedPost
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal server error while updatePost at postsC.js"
        });
    }
}

export async function deletePost(req, res) {
    try {

        const { post_id } = req.params

        const deletedPost = await deletePostM(req.session.userId, post_id)

        return res.status(200).json({msg: "post has been deleted", deletedPost})
        
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error while deletePost at postsC.js"})
    }
}
