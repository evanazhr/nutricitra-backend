import { Router } from "express";
import authRouter from '../services/authentications/routes/index.js';
import userRouter from '../services/users/routes/index.js';
import predictRouter from '../services/predicts/routes/index.js';

const router = Router();


router.use('/', authRouter);
router.use('/', userRouter);
router.use('/', predictRouter)

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Nutriwise API'
    });
});


export default router;