const express = require("express");
const router = express.Router();

const Messages = require('../models/Message');

//add
router.post("/", async (req,res) => {
    const newMessage = new Message(req.body)

    try{

        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)  

    }catch(error) {
        return res.status(400).json({ error });
    }
})

//get

router.get("/:coversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            coversationId: req.params.coversationId,
        });
        return res.status(200).json(messages);
    } catch (error){
        return res.status(400).json({ error });

    }
});





module.exports = router;