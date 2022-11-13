const Chat = require("../models/Chat");

// Create a new chat
const createMessage = async (body) => {
    const { sender, receiver, date, message } = body;
    if(!sender || !receiver || !date || !message){
        throw new Error(`Not all required fields were informed.[sender, receiver, date, message]`);
    }
    const createdChat = await Chat.create(body);
    if(createdChat){
        return ('Chat created');
    }
    else{
        throw new Error('Invalid chat data.');
    }
}

// Return all chat partners of one user
const listPartners = async (userid) => { return await (Chat.find({$or:[{sender:userid},{receiver:userid}]})) || []}

// Return all messages of two users
const viewMessages = async (chatid) => { 
    return await (
        Chat.find({
            $or:[
                {
                    $and:[
                        {sender:userid},
                        {receiver:user2id}
                    ]
                },
                {
                    $and:[
                        {sender:user2id},
                        {receiver:userid}
                    ]
                }
            ]
        })
    ) || []}

// deletes a chat given a chat id
const deleteMessage = async (chatid) => { await Chat.deleteOne({_id: chatid})}

module.exports = {
    createMessage,
    viewMessages,
    listPartners,
    deleteMessage,
};