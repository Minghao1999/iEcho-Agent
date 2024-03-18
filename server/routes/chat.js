import { Router } from "express";
import { newMessage, getMessage }from '../controllers/message-controller.js';
import router from "./user.js";
// import { addChat, deleteChatById, getAllChats, getChatById, newChat } from "../controllers/chat.js";


router.post('/message/add', newMessage);
router.get('/message/get/:id', getMessage);
// import { verifyTokenMiddleware } from "../middlewares/auth.js";
// const router = Router();
// router.post("/new", verifyTokenMiddleware, newChat);
// router.put("/update", verifyTokenMiddleware, addChat);
// router.get('/chats', verifyTokenMiddleware, getAllChats);
// router.get("/chatId", verifyTokenMiddleware, getChatById);
// router.delete('/chatId', verifyTokenMiddleware, deleteChatById);


export default router;
