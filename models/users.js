export async function getAllUsers() {
	if (!db) throw new Error('DB not found')
	const snapshot = await db.collection('users').get()
	return snapshot.docs.map((doc) => doc.data())
}

export async function getUser(id) {
	if (!db) throw new Error('DB not found')
	if (!id) throw new Error('No id provided')
	const docRef = db.collection('users').doc(id)
	const doc = await docRef.get()
	return doc.data()
}

export async function setUser(user) {
	if (!db) throw new Error('DB not found')
	if (!user) throw new Error('No user provided')
	const docRef = db.collection('users').doc(user.id)
	const result = await docRef.set(user)
	return !!result
}

export async function deleteUser(id) {
	if (!db) throw new Error('DB not found')
	if (!id) throw new Error('No id provided')
	const docRef = db.collection('users').doc(id)
	const result = await docRef.delete()
	return !!result
}
