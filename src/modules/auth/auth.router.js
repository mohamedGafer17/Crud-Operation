import * as authController from './controller/auth.js'
import {Router} from "express"
const router = Router()

router.post('/register', authController.register) //signup
router.get('/confirmEmail/:token' , authController.confirmEmail)
router.post('/login', authController.login)


export default router