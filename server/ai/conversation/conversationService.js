const Conversation = require("../../models/Conversation")

async function getHistory(sessionId) {
    const conversation = await Conversation.findOne({ sessionId });
    if (!conversation) {
        return [];
    }
    return conversation.messages;
}

async function addMessage(sessionId, role, content) {

    let conversation = await Conversation.findOne({ sessionId });
    if (!conversation) {
        conversation = await Conversation.create({
            sessionId,
            messages: [],
        });
    }

    conversation.messages.push({
        role,
        content,
    });

    await conversation.save();

}

module.exports = {
    getHistory,
    addMessage,
};