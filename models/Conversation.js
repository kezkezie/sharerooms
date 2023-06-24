const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },

    },
    { timestamps: true }
);

const conversationModel = mongoose.model("conversations", ConversationSchema);

module.exports = conversationModel;