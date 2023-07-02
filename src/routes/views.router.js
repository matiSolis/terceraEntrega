import { Router } from "express";
import ViewsController from "../controllers/views.controllers.js";

const router = Router();
const viewsController = new ViewsController();

const adminSession = (req, res, next) => {
    if(req.session.user.role !== 'Admin'){
        return res.status(403).send({error: { status:403, message:'Access denied.'}})
    };
    next();
};
const publicAcces = (req,res,next) =>{
    if(req.session.user) return res.redirect('/profile');
    next();
};
const privateAcces = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login');
    next();
};
//router admin
router.get('/', privateAcces, viewsController.homeRender);
router.get('/admin', adminSession, viewsController.adminRender);
//router profile lo ven todos admin o user
router.get('/current', privateAcces ,viewsController.currentRender);
router.get('/carts/:cid', privateAcces, viewsController.cartRender);
router.get('/product/:pid', privateAcces, viewsController.productRender);
router.get('/products', privateAcces, viewsController.productsRender);
//router registro y logueo
router.get('/register', publicAcces, viewsController.registerRender);
router.get('/login', publicAcces, viewsController.loginRender);

export default router;

