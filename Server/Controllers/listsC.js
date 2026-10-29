import { LIST_TYPES, addToListM, getListM, removeFromListM } from "../Models/listsM.js"

export async function addToListC(req, res) {
    try {
        const { tmdb_id, list_type, movie_title } = req.body

        if (!Number.isInteger(tmdb_id) || !movie_title || !LIST_TYPES.includes(list_type)) {
            return res.status(400).json({ error: "Invalid tmdb_id, movie_title or list_type." })
        }

        const item = await addToListM(req.session.userId, req.body)

        return res.status(item ? 201 : 200).json({
            msg: item ? "Added to list." : "Already in list.",
            item
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error while adding to list." })
    }
}

export async function getListC(req, res) {
    try {
        const { type } = req.query

        if (!LIST_TYPES.includes(type)) {
            return res.status(400).json({ error: "Invalid list type." })
        }

        const items = await getListM(req.session.userId, type)
        return res.status(200).json({ items })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error while getting list." })
    }
}

export async function removeFromListC(req, res) {
    try {
        const tmdbId = Number(req.params.tmdbId)
        const { type } = req.query

        if (!Number.isInteger(tmdbId) || !LIST_TYPES.includes(type)) {
            return res.status(400).json({ error: "Invalid tmdbId or list type." })
        }

        const removed = await removeFromListM(req.session.userId, tmdbId, type)

        if (!removed) {
            return res.status(404).json({ error: "Item not found in list." })
        }

        return res.status(200).json({ msg: "Removed from list." })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error while removing from list." })
    }
}