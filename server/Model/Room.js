const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['laboratory', 'teaching'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  computers: {
    type: Number,
    default: 0
  },
  projector: {
    type: Boolean,
    default: false
  },
  locked: {
    type: Boolean,
    default: false
  },
  hourlyAvailability: [{
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }],
  weeklyAvailability: [{
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    }
  }]
});

module.exports = mongoose.model('Room', roomSchema);
