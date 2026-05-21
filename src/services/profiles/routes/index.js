import { Router } from 'express';
import { createProfile, getProfile, updateProfile } from '../controller/profile-controller.js';
import { postProfilePayloadSchema, putProfilePayloadSchema } from '../validator/index.js';
import authenticateToken from '../../../middlewares/auth.js';
import { validate } from '../../../middlewares/validate.js';

const router = Router();

// Protected Routes
router.post('/profile', authenticateToken, validate(postProfilePayloadSchema), createProfile);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, validate(putProfilePayloadSchema), updateProfile);

export default router;