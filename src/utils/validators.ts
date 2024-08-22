// src/validators.ts

import { body } from 'express-validator';

// Email Validator
export const validateEmail = body('email')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .normalizeEmail();
