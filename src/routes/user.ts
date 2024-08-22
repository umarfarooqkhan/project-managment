import { Router } from 'express';
import { validateEmail } from '../utils/validators';
import { validationResult } from 'express-validator';
import {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post(
    '/',
    validateEmail, // Use the email validator
    (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createUser
);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.post('/login', loginUser);

export { router as userRouter };
