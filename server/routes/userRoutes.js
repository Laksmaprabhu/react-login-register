import express from 'express';
import { registerUser, getallUsers, loginUser, googleAuthCallback } from '../controller/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import passport from 'passport';
const router = express.Router();

router.post("/add",registerUser);
router.get(
    "/list",
    verifyToken,
    authorize("admin"),
    getallUsers
);


router.post("/login",loginUser);
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
router.get( "/google/callback", passport.authenticate("google", { failureRedirect: "/login", session: false }), googleAuthCallback );
export default router;