import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
const sendMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const { message } = req.body;
    const { _id: senderId } = req.user;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }
    const newMessage = new Message({
      senderId,
      reciverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id, newMessage);
    }

    await conversation.save();
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export { sendMessage };
