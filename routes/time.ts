import { Router } from "express";
import { getTimes, postTime, putTime, deleteTime } from "../controllers/timeController";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/userController";


const router = Router();

router.get('/:idUser', getTimes);
router.post('/', postTime);
router.put('/:id', putTime);
router.delete('/:id', deleteTime);

export default router;