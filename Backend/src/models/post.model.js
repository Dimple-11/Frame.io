const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\//
    },
    caption: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    }
}, {
    timestamps: true
})

const postModel = mongoose.model("post",postSchema)




module.exports = postModel;
