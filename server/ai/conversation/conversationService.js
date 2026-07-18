const Conversation = require("../../models/Conversation")

async function getHistory(sessionId) {

    const conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
        return [];
    }

    return conversation.messages.map(message => ({
        role: message.role,
        content: message.content,
    }));
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

    if (conversation.messages.length > 30) {
        conversation.messages =
            conversation.messages.slice(-30);
    }

    await conversation.save();

}

module.exports = {
    getHistory,
    addMessage,
};