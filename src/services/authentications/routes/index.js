import { Router } from "express";
import { login, refreshToken, logout, logoutAllDevices } from '../controller/authentication-controller.js';
import { deleteAuthenticationPayloadSchema, putAuthenticationPayloadSchema, postAuthenticationPayloadSchema } from "../validator/schema.js";
import { validate } from "../../../middlewares/validate.js";
import authenticateToken from "../../../middlewares/auth.js";

import { authLimiter } from "../../../middlewares/rateLimiter.js";

const router = Router();

// public routes
// AUTHENTICATIONS:
// POST   /authentications            → Login
// PUT    /authentications            → Refresh access token

router.post('/authentications', authLimiter, validate(postAuthenticationPayloadSchema), login);
router.put('/authentications', validate(putAuthenticationPayloadSchema), refreshToken);

// protected routes
// AUTHENTICATIONS:
// DELETE /authentications            → Logout

router.delete('/authentications', authenticateToken, authLimiter, validate(deleteAuthenticationPayloadSchema), logout);
router.delete('/authentications/all', authenticateToken, authLimiter, validate(deleteAuthenticationPayloadSchema), logoutAllDevices);

export default router;