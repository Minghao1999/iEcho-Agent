import { Router } from "express";
import { webhook }from '../controllers/webhook.js';

router.post('webhook/whatsapp', webhook);



export default router;
