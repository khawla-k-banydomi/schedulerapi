var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var holidaySchema = new Schema({
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  timeStart: {
    type: Date
  },
  timeEnd: {
    type: Date
  },
  fixedWeekDay: {
    type: Number
  }
});

module.exports = mongoose.model('Holiday', holidaySchema);
