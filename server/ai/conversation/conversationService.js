const Conversation = require("../../models/Conversation")

async function getHistory(userId) {

    const conversation = await Conversation.findOne({ user: userId });

    if (!conversation) {
        return [];
    }

    return conversation.messages.map(message => ({
        role: message.role,
        content: message.content,
    }));
}

async function addMessage(userId, role, content) {

    let conversation = await Conversation.findOne({ user: userId });
    if (!conversation) {
        conversation = await Conversation.create({
            user: userId,
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