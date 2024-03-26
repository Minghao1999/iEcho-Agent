import { Router } from 'express';
import { Login,completeUser,logout,getProfile,updateProfile, ForgotRequest, ResetPassword} from '../controllers/user.js';

const router = Router();

router.post('/login', Login);
router.post('/signup',completeUser);
router.post('/forgot', ForgotRequest )
// router.get('/forgot-check', CheckLogged,forgotVerify )
router.put('/forgot-finish', ResetPassword)
router.get('/getProfile',getProfile )
router.post('/updateProfile',updateProfile);
router.get('/logout',logout )
export default router;
