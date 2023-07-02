import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";

const router = Router();
const Controller = new CartController();

router.get('/', cartController.getAllCarts);

export default router;