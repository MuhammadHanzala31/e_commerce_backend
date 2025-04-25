import Router from 'express'
import { changePassword, changeUserDetails, getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/change-password').post(verifyJwt, changePassword)
router.route('/update-user').put(verifyJwt, changeUserDetails)
router.route('/get-user').get(verifyJwt, getCurrentUser)

export default router