import { getContact, getMessage, newMessage, putSetting } from '../controllers/message.js';
import router from "./user.js";


router.post('/message/add', newMessage);
router.get('/message/get/:id', getMessage);
router.get('/contact/get', getContact);
router.post('/update/setting', putSetting);


export default router;
