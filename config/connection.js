const mongoose = require("mongoose");
// creates connection to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/socialDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// export
module.exports = mongoose.connection;