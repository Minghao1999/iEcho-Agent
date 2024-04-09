import { getContact, getMessage, newMessage, putSetting,scheduled,addScheduledMessage } from '../controllers/message.js';
import router from "./user.js";


router.post('/message/add', newMessage);
router.get('/message/get/:id', getMessage);
router.get('/contact/get', getContact);
router.post('/update/setting', putSetting);
router.post('/message/scheduled', scheduled);
router.post('/message/addScheduledMessage', addScheduledMessage);

export default router;
    