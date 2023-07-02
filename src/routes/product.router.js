import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);
router.post('/', productController.addProduct);
router.delete('/:pid', productController.deleteProductById);
router.put('/:pid', productController.updateProductById);
export default router;  