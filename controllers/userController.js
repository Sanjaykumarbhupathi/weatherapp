const bcrypt = require('bcryptjs'); // Update the import
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Return userId, username, and token in the response
        res.json({
            userId: user._id,
            username: user.username,
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

exports.addToFavorites = async (req, res) => {
  try {
    const { userId, cityName } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.favorites.includes(cityName)) {
      return res.status(400).json({ message: 'City already in favorites' });
    }

    user.favorites.push(cityName);
    await user.save();

    res.json({ message: 'City added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
};

exports.checkFavorite = async (req, res) => {
  try {
    const { userId, cityName } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isFavorite = user.favorites.includes(cityName);
    res.json({ isFavorite });
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ message: 'Error checking favorite' });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { userId, cityName } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const index = user.favorites.indexOf(cityName);
    
    if (index > -1) {
      user.favorites.splice(index, 1); // Remove from favorites
    } else {
      user.favorites.push(cityName); // Add to favorites
    }

    await user.save();
    const isFavorite = user.favorites.includes(cityName);
    
    res.json({ isFavorite });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Error toggling favorite' });
  }
};

exports.getFavorites = async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const favorites = user.favorites;
      res.json({ favorites });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorites' });
    }
  };
  
  exports.removeFavorite = async (req, res) => {
    try {
      const { userId, cityName } = req.body;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      user.favorites = user.favorites.filter(city => city !== cityName);
      await user.save();
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Error removing favorite' });
    }
  };