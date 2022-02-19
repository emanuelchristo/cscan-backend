import { getAuth } from 'firebase-admin/auth'

export async function adminAuth(req, res, next) {
	try {
		const decodedToken = await getAuth().verifyIdToken(req.query.idToken)
		if (decodedToken.email == process.env.ADMIN_EMAIL) next()
		else res.status(403).send({ message: 'Admin only content' })
	} catch (err) {
		console.error(err)
		res.status(403).send({ message: 'Admin only content' })
	}
}
