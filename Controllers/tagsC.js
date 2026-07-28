import { addTagsM, deleteTagsM } from "../Models/usersM.js"

export async function addTags(req, res) {

    try {
        
        const { tags } = req.body

        if (!Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({error: "tags must be a non-empty array"})
        }

        const user = await addTagsM(tags, req.session.userId)

        if (user.rowCount === 0) {
            return res.status(500).json({error: "while addTagsM"})
        }

        return res.status(200).json({msg: "tags added succesfully"})

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Internal server error"})
    }
    
}

export async function deleteTags(req, res) {
    
    try {
        
        const { tags } = req.body

        if (!Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({error: "tags must be a non-empty array"})
        }

        const user = await deleteTagsM(tags, req.session.userId)

        if (user.rowCount === 0) {
            return res.status(500).json({error: "while deleteTagsM"})
        }

        return res.status(200).json({msg: "tags deleted succesfully"})

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Internal server error"})
    }
   
}