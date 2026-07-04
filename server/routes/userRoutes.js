import express from 'express';
import { registerUser, getallUsers, loginUser } from '../controller/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js';
//import { authorize } from '../middleware/authorize.js';

const router = express.Router();

router.post("/add",registerUser);
router.get(
    "/list",
    verifyToken,
   // authorize("admin"),
    getallUsers
);
router.post("/login",loginUser);

export default router;