import { Router } from 'express';
import userRouter from './api/user';
import actionRouter from './api/action';

const router = Router();

router.use('/user', userRouter);
router.use('/action', actionRouter);

export default router;