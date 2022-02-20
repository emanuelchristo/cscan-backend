import { registerSchema } from '../schemas/register-schema.js'

export async function validateRegister(req, res, next) {
	try {
		const cleaned = registerSchema.noUnknown().cast(req.body)
		const pass = await registerSchema.validate(cleaned)

		if (pass) {
			req.body = cleaned
			return next()
		} else throw new Error('Failed to validate register info')
	} catch (err) {
		console.error(err)
		res.status(400).send({ message: 'Invalid info' })
	}
}