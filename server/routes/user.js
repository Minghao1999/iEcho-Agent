import { Router } from 'express';
import { Login,completeUser,logout,getProfile,updateProfile, ForgotRequest, ResetPassword, getUser,inquiry} from '../controllers/user.js';
import { verifyTokenMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/login', Login);
router.get('/',verifyTokenMiddleware,getUser);
router.post('/signup',completeUser);
router.post('/forgot', ForgotRequest )
// router.get('/forgot-check', CheckLogged,forgotVerify )
router.put('/forgot-finish', ResetPassword)
router.get('/getProfile',getProfile )
router.post('/updateProfile',updateProfile);
router.get('/logout',logout )
router.post('/inquiry',inquiry);
export default router;
