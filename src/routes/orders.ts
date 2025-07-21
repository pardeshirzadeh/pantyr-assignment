import express from 'express';
import { putOrders } from '../controllers/orders';

const router = express.Router();

router.post('/orders', putOrders);

export default router;
