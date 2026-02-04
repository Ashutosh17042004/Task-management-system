const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

// Auth Routes
router.post('/auth/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], authController.register);

router.post('/auth/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], authController.login);

router.get('/me', authMiddleware, authController.getMe);
router.put('/me', authMiddleware, authController.updateMe);

// Task Routes
router.get('/tasks', authMiddleware, taskController.getTasks);
router.post('/tasks', [authMiddleware, [check('title', 'Title is required').not().isEmpty()]], taskController.createTask);
router.put('/tasks/:id', authMiddleware, taskController.updateTask);
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask);

module.exports = router;