import express, { Request, Response } from 'express';
const router = express.Router();
import authController from '../controllers/authController';

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               number:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router
.route('/signup')
.post(authController.createUser)

/**
 * @swagger
 * /api/v1/auth/users/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Authenticate a user and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */
router
.route('/users/login')
.post(authController.loginUser)

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Logout user
 *     description: Logout the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Not authenticated
 */
router
.route('/logout')
.get(authController.logoutUser)

export default router;



