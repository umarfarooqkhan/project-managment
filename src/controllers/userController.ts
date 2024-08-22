import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../db/models/user';
import jwtConfig from '../config/jwtConfig';

// Fetch the saltRounds from the environment, default to 10 if not set
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

// Get all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields: fullName, email, and/or password' });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Get current date for createdOn
        const now = new Date();

        // Set createdBy to a default value or the logged-in user
        const createdBy = fullName; // Adjust according to your requirements

        // Create a new user with the hashed password
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            createdOn: now,
            createdBy,
        });

        // Return the newly created user, excluding password
        const { password: _, ...userWithoutPassword } = newUser.get({ plain: true });

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields: email and/or password' });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

        // Prepare user data to exclude sensitive information like password
        const { password: _, ...userWithoutPassword } = user.get({ plain: true });

        // Send the token and user data
        res.status(200).json({
            accessToken: token,
            user: userWithoutPassword
        });
    } catch (error) {
        next(error);
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullName, email, password, updatedBy } = req.body;
        const [updated] = await User.update(
            { fullName, email, password, updatedBy, updatedOn: new Date() },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};
