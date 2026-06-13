const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true
  },
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional, so anonymous users can also create links
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', UrlSchema);
