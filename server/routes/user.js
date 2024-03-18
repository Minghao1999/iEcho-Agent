import { Router } from 'express';
import { Login,completeUser} from '../controllers/user.js';

const router = Router();

router.post('/login', Login);
router.post('/signup',completeUser);
// router.post('/forgotpassword', ForgotPassword);
export default router;
