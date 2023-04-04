const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  hourlyAvailability: {
    start: { type: Number, required: true },
    end: { type: Number, required: true }
  },
  weeklyAvailability: [{
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  }]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
