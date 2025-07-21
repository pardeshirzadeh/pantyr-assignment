import express from "express";
import products from "./products";
import orders from "./orders";

const router = express.Router();

router.use('/', products);
router.use('/', orders);

export default router;
