import { Router } from "express";
import { predictImage, getPredictLogs } from "../controller/predict-controller.js";
import upload from "../../../middlewares/multer.js";

const router = Router();


router.get('/predict', getPredictLogs);
router.post('/predict', upload.single('file'),  predictImage)

export default router;