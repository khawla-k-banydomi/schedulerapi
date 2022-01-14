var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var holidaySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timeStart: {
        type: Date,
    },
    timeEnd: {
        type: Date,
    },
    timeline:{
        type: mongoose.Types.ObjectId,
        ref: 'Timeline'
    },
});
module.exports = mongoose.model('Holiday', holidaySchema);
