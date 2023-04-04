const mongoose = require('mongoose');

const teachingSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Teaching = mongoose.model('Teaching', teachingSchema);

module.exports = Teaching;
