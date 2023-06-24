const express = require("express");
const router = express.Router();

const Conversation = require('../models/Conversation')

//new conv

router.post("/", async (req, res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });

    try{
        //save to db

        const savedConversation = await newConversation.save()
        
        return res.status(200).json(savedConversation)
    } catch(error){
        return res.status(400).json({error});
    }
})
//get conv of a user

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]},
        });
        return res.status(200).json(conversation)
    } catch (error){
        return res.status(400).json({ error });

    }
});

module.exports = router;