const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }],
  type: {
    type: String,
    enum: ['theory', 'lab'],
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Course', courseSchema);