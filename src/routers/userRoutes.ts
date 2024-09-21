// routes user (Definición de rutas para endpoints relacionados con usuarios)
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authentication';
import { authorize } from '../middlewares/authorize';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
// Rutas protegidas (solo accesibles con token y roles autorizados)
router.get('/users', authMiddleware, authorize('admin','user'), userController.getAllUsers);
router.put('/users/:id', authMiddleware, authorize('admin'), userController.updateUser);
router.delete('/users/:id', authMiddleware, authorize('admin'), userController.deleteUser);

export default router;