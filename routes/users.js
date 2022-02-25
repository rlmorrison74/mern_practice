import Router from 'express'
import * as controllers from '../controllers/users.js'

const router = Router()

router.post('/sign-in', controllers.loginUser)
router.post('/sign-up', controllers.registerUser)
router.get('/verify', controllers.verifyUser)

export default router