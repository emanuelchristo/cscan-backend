import { getAuth } from 'firebase-admin/auth'
import { setUser } from '../models/users.js'

export async function register(req, res) {
	try {
		const token = req.headers.authorization ;
		const decodedToken = await getAuth().verifyIdToken(token)
		const email = decodedToken.email
		const uid = decodedToken.uid
		const { name, institute } = req.body

		const user = { uid, email, name, institute }
		await setUser(user)

		res.json({ success: true })
	} catch (err) {
		console.error(err)
		res.status(400).send({ success: false })
	}
}
