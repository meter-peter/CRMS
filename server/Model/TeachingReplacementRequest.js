const mongoose = require('mongoose');

const teachingReplacementRequestSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalReservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true
  },
  newReservationDetails: {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  rejectionReason: String
});

const TeachingReplacementRequest = mongoose.model('TeachingReplacementRequest', teachingReplacementRequestSchema);

module.exports = TeachingReplacementRequest;
