var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timelineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    schedule:
        [
            {
                'sid': {
                    type: mongoose.Types.ObjectId,
                    ref: 'Schedule'
                }
            }]
    ,
    timeStart: {
        type: Date,
    },
    timeEnd: {
        type: Date,
    },
});
module.exports = mongoose.model('Timeline', timelineSchema);
