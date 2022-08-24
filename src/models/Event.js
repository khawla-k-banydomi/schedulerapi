var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startTime: {
    type: Date,
    default: Date.now()
  },
  endTime: {
    type: Date,
    default: Date.now()
  },
  reminderTime: {
    type: Date,
    default: Date.now()
  },
  priority: {
    type: Number,
    default: 0
  },
  repeatEvery: {
    type: String,
    enum: ['day', 'week', 'month', 'year'],
    default: null
  },
  isDeleted: {
    type: Boolean
  }
});

module.exports = mongoose.model('Event', eventSchema);
