import express from 'express';
import { deleteUser, getProfile, getUsers } from '../controllers/userContoller.js';
import { verifyRole, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", verifyToken, verifyRole("admin"), getUsers);
router.delete("/:id", verifyToken, verifyRole("admin"), deleteUser);
router.get("/me", verifyToken, getProfile);

export default router;