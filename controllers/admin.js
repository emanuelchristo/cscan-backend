import { getAllUsers } from '../models/users.js'

export async function getUsers(req, res) {
	try {
		const users = await getAllUsers()
		res.json(users)
	} catch (err) {
		console.error(err)
		res.status(400).send(null)
	}
}
