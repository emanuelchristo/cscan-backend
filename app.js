import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

// Firebase
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// const serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_CREDS, 'base64').toString('ascii'))
import serviceAccount from './serviceAccountKey.js'

initializeApp({
	credential: cert(serviceAccount),
})
const db = getFirestore()
global.db = db // Adding db to global context

// Controllers
import { register } from './controllers/register.js'
import { getUsers } from './controllers/admin.js'

// Middlewares
import { validateRegister } from './middlewares/validate-register.js'
import { adminAuth } from './middlewares/admin-auth.js'

// Setting up express
const PORT = process.env.PORT || 5500
const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.post('/register', validateRegister, register)

// Admin router
const admin = express.Router()
admin.use(adminAuth)

// Admin routes
admin.get('/users', getUsers)

app.use('/admin', admin)

// Starting server
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
