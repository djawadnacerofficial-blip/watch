export function authMW(req, res, next) {
    if (!req.session.userId) {
        console.log()
        return res.status(401).json({error: "Unauthorized"})
    }
    next()
}