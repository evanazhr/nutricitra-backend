import { Router } from 'express';
import { createUser, getUserById, updateAvatar } from '../controller/user-controller.js';
import { validate } from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/auth.js';
import upload from '../../../middlewares/multer.js';
import { postUserPayloadSchema } from '../validator/schema.js';

const router = Router();

// public routes
router.post('/users', validate(postUserPayloadSchema), createUser);
router.get('/users/:id', getUserById);

// protected routes
router.put('/users/avatar', authenticateToken, upload.single('avatar'), updateAvatar);

export default router;