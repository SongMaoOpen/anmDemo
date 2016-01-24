// import thrid party library 导入第三方插件
var mongoose = require('mongoose');

// Define user's model; 定义用户模型

module.exports = mongoose.model('tasks', new mongoose.Schema({
    name: String,
	content: String,
    deadline: {
        type: Date,
        default: Date.now
    },
    create: {
        type: Date,
        default: Date.now
    }
}));
