import { getAuth } from 'firebase-admin/auth'
import { getUser } from '../models/users.js'

export async function getuser(req, res) {
    try {
        const token = req.headers.authorization ;
        const decodedToken = await getAuth().verifyIdToken(token)
        const uid = decodedToken.uid

        const user = await getUser(uid)
        delete user.uid
        
        user.success = true ;
        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(400).send({ success: false })
    }
}