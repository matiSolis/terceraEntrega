import { Router } from "express";
import passport from "passport";
import SessionController from "../controllers/session.controllers.js";

const router = Router();
const sessionController = new SessionController();

router.post('/register', passport.authenticate('register', { failureRedirect:'/failregister'} ), sessionController.register);
router.get('/failregister', sessionController.failRegister);
router.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}), sessionController.login);
router.get('/faillogin', sessionController.failLogin);
router.get('/logout', sessionController.logout);
router.get('/github', passport.authenticate('github', {scope:['user:email']}), sessionController.github);
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), sessionController.githubCallbacks)

export default router;