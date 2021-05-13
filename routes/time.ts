import { Router } from "express";
import { getTimes, postTime, putTime, deleteTime } from "../controllers/timeController";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/userController";


const router = Router();

router.get('/api/:id/', getTimes);
router.post('/api/', postTime);
router.put('/api/:id', putTime);
router.delete('/api/:id', deleteTime);

export default router;