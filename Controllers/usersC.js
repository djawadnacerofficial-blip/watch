import { myProfile, profile, updateProfile } from '../Models/usersM.js'

export async function getMyProfile(req, res) {

    try {
        
        const user = await myProfile(req.session.userId)

        if (!user) {
            return res.status(500).json({error: "calling getMyProfile at usersM.js"})
        }

        console.log('myProfile data has been  sent succesfully')

        return res.status(200).json({
            ...user
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error, while myProfile at usersM.js" })
    }

    
}

export async function getUserProfile(req, res) {

    const { username } = req.params

    try {
        
        const user = await profile(username)

        if (!user) {
            return res.status(500).json({error: "calling getUserProfile at usersM.js"})
        }
        
        console.log('Profile data has been  sent succesfully')

        return res.status(200).json({
            ...user
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error, while getUserProfile at usersM.js"})
    }
}

export async function updateMyProfile(req, res) {
    try {
        
        const updates = {...req.body}


        const user = await updateProfile(updates, req.session.userId)

        if (!user) {
            return res.status(400).json({error: "No valid fields to update"})
        }

        return res.status(200).json({msg: "user's profile updated succesfully"})

    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error, while updateMyProfile at usersC.js"})
    }
}