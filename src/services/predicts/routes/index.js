import { Router } from "express";
import { predictImage, getPredictLogs } from "../controller/predict-controller.js";
import upload from "../../../middlewares/multer.js";
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.get('/predict', authenticateToken, getPredictLogs);
router.post('/predict', authenticateToken, upload.single('file'), predictImage);

export default router;