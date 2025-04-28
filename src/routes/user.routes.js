import Router from 'express'
import { assignRole, changePassword, changeUserDetails, deleteUser, getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { checkAdmins } from '../middlewares/checkAdmin.js';

const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/change-password').post(verifyJwt, changePassword)
router.route('/update').put(verifyJwt, changeUserDetails)
router.route('/get-user').get(verifyJwt, checkAdmins ,getCurrentUser)
router.route('/:userId/update-role').put(verifyJwt, checkAdmins, assignRole)
router.route('/delete/:id').delete(verifyJwt, checkAdmins, deleteUser)

export default router