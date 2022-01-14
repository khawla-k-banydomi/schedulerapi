var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    type: {
        type: String,
        enum: ['urgent', 'not urgent', 'normal']
    },
    repeat: {
        type: Number,
        default: 0
    },
    restore:{
        type: Boolean
    }
});
module.exports = mongoose.model('Event', eventSchema);
