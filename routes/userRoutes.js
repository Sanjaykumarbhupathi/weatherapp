const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/add-to-favorites', userController.addToFavorites);
router.post('/check-favorite', userController.checkFavorite); // New route to check if city is a favorite
router.post('/toggle-favorite', userController.toggleFavorite); // New route to toggle favorite status
router.post('/get-favorites',  userController.getFavorites);
router.post('/remove-favorite', userController.removeFavorite);

module.exports = router;
