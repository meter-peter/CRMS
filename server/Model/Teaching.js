const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['faculty', 'EDIP', 'ETEP'],
    required: true
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
