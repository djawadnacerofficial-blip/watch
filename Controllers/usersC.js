import { myProfile, profile } from '../Models/usersM.js'

export async function getMyProfile(req, res) {

    const user = await myProfile(req.session.userId)

    if (!user) {
        return res.status(500).json({error: "calling getMyProfile at usersM.js"})
    }

    console.log('myProfile data has been  sent succesfully')

    return res.status(200).json({
        ...user
    })

    
}

export async function getUserProfile(req, res) {

    const { username } = req.params

    const user = await profile(username)

    if (!user) {
        return res.status(500).json({error: "calling getUserProfile at usersM.js"})
    }
    
    console.log('Profile data has been  sent succesfully')

    return res.status(200).json({
        ...user
    })

}

export async function updateMyProfile(req, res) {
    req.session.userId
}