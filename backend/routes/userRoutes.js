import express from 'express'
import {authUser,registerUser, saveEvent} from '../controllers/userControllers.js'


const router =  express.Router();

router.route('/').post(registerUser)
router.post('/login', authUser)
router.post('/details', saveEvent)





export default router;