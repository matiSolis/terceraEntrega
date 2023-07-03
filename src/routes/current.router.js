import { Router } from "express";

const router = Router();

router.get('/', cartController.getAllCarts);

export default router;