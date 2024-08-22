import { Router } from 'express';
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController'; 
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, addProject);
router.get('/', authenticateToken, getAllProjects);
router.get('/:id', authenticateToken, getProjectById);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

export { router as projectRouter };
