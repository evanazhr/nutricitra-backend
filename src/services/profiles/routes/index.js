import { Router } from 'express';
import { createProfile, getDefaultAkgData, getProfile, updateProfile } from '../controller/profile-controller.js';
import { getDefaultAkgDataPayloadSchema, postProfilePayloadSchema, putProfilePayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import { validate, validateQuery } from '../../../middlewares/validate.js';

const router = Router();

// Protected Routes
router.post('/profiles', authenticateToken, validate(postProfilePayloadSchema), createProfile);
router.get('/profiles', authenticateToken, getProfile);
router.put('/profiles', authenticateToken, validate(putProfilePayloadSchema), updateProfile);
router.get('/profiles/default-akg', authenticateToken, validateQuery(getDefaultAkgDataPayloadSchema), getDefaultAkgData);

export default router;