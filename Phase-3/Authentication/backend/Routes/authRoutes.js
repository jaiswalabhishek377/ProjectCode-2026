import Router from 'express'
import { registerUser, loginUser } from '../Controllers/authController.js'

const router = Router()


router.post('/login', loginUser)
router.post('/register', registerUser)
export default router