import { Router } from 'express';
import {
  createTask,
  deleteTask,
  updateTask,
  getTaskById,
  getAllTasks,
  getTasks
} from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createTask);
router.delete('/:id', authenticateToken, deleteTask);
router.put('/:id', authenticateToken, updateTask);
router.get('/id/:id', authenticateToken, getTaskById);
router.get('/', authenticateToken, getAllTasks);
router.get('/search/all', authenticateToken, getTasks);

export { router as tasksRouter };
