import { Request, Response, Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser, newUser, login} from "../controllers/userController";


const router = Router();

router.get('/new', newUser);

// API
router.get('/api', getUsers);
router.get('/api/:id', getUser);
router.get('/login/', login);
router.post('/api', postUser);
router.put('/api/:id', putUser);
router.delete('/api/:id', deleteUser);

export default router;