import { Router } from 'express';
import { createUser, updateAvatar, updateFullnameUser } from '../controller/user-controller.js';
import { validate } from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/auth.js';
import upload from '../../../middlewares/multer.js';
import { postUserPayloadSchema, updateFullnamePayloadSchema } from '../validator/schema.js';

const router = Router();

// public routes
router.post('/users', validate(postUserPayloadSchema), createUser);

// protected routes
router.put('/users/avatar', authenticateToken, upload.single('avatar'), updateAvatar);
router.put('/users/fullname', authenticateToken, validate(updateFullnamePayloadSchema), updateFullnameUser);

export default router;