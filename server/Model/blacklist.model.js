const mongoose = require("mongoose");
const blackListSchema = mongoose.Schema({
    token: String
},
    { versionKey: false }
)

const BlackListModel = mongoose.model("BlackList", blackListSchema);

module.exports = BlackListModel