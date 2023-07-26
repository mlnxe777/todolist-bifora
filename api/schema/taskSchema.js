const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://127.0.0.1:27042/task', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const taskSchema = new Schema({
    description: {
        type: String,
        
    },
    isCompleted: {
        type: String,
        
    },
    deleted: {
        type: String,
        
    }
})

const taskCollection = mongoose.model("task", taskSchema);
module.exports = taskCollection;