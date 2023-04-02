const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    Content: {
        type: String,
        required: true
    },



    tags: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },


    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },


}, { timestamps: true }
)

module.exports = mongoose.model('post', PostSchema)