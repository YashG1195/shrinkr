const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Helper to check optional auth
const optionalAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      req.user = decoded.user;
    } catch (err) {
      // Ignore token errors for optional auth
    }
  }
  next();
};

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post('/shorten', optionalAuth, async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

  // Basic URL validation
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(longUrl)) {
    return res.status(401).json('Invalid long URL');
  }

  // Create url code
  const urlCode = nanoid(8);

  try {
    let url = await Url.findOne({ longUrl });

    // If it exists, but we are authenticated, we might want to still return it, or create a new one.
    // Usually it's fine to return the existing one if it belongs to the same user or has no user.
    if (url && (!req.user || (url.user && url.user.toString() === req.user.id))) {
      res.json(url);
    } else {
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        user: req.user ? req.user.id : undefined,
        createdAt: new Date()
      });

      await url.save();

      res.json(url);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// @route   GET /api/url/my-urls
// @desc    Get all URLs for a user
router.get('/my-urls', auth, async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// @route   DELETE /api/url/:id
// @desc    Delete a URL
router.delete('/:id', auth, async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ msg: 'URL not found' });
    }

    if (url.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await url.deleteOne();

    res.json({ msg: 'URL removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;
