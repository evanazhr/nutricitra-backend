import { Router } from 'express';
import { createProfile, getProfile, updateProfile } from '../controller/profile-controller.js';
import { postProfilePayloadSchema, putProfilePayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import { validate } from '../../../middlewares/validate.js';

const router = Router();

// Protected Routes
router.post('/profiles', authenticateToken, validate(postProfilePayloadSchema), createProfile);
router.get('/profiles', authenticateToken, getProfile);
router.put('/profiles', authenticateToken, validate(putProfilePayloadSchema), updateProfile);

export default router;