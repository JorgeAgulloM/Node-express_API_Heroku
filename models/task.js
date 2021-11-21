const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    tittle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    complted: {
        type: Boolean, 
        require: true,
        default: false
    },
    created_at: {
        type: Date,
        require: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', TaskSchema);