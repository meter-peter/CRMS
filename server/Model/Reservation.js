const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  teachingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teaching',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
