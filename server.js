const express = require("express");
// const http = require("http");
// const Server = require("socket.io").Server

const app = express();
// const server = http.createServer(app)
// const io = new Server(server, {
//     cors:{
//         origin:"*"
//     }
// })


// io.on("connection", (socket) => {
//     console.log('we are connected')

//     socket.on('chat', chat => {
//         io.emit('chat', chat)
//     })

//     socket.on('disconnect', () => {
//         console.log("not connected")
//     })
// })

app.use(express.json());

const dbConfig = require('./db');
const Booking = require('./models/booking')
const Room = require('./models/rooms')
const User = require('./models/user')
const Conversation = require('./models/Conversation')
const Message = require('./models/Message')

const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingRoute = require('./routes/bookingsRoute')
const conversationRoute = require('./routes/conversationsRoute')
const messageRoute = require('./routes/messagesRoute')


app.use(express.json())

app.use('/api/rooms' , roomsRoute)
app.use('/api/user' , usersRoute)
app.use('/api/bookings', bookingRoute)
//app.use('/api/conversations', conversationRoute)
//app.use('/api/messages', messageRoute)


app.post("/messages", async (req,res) => {
    const newMessage = new Message(req.body)

    try{

        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)  

    }catch(error) {
        return res.status(400).json({ error });
    }
})

app.get("/messages/:coversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId:  req.params.coversationId,
        });
        return res.status(200).json(messages);
    } catch (error){
        return res.status(400).json({ error });

    }
});


app.post("/conversations", async (req, res)=>{
    console.log(`senderId is ${req.body.senderId}`);
    console.log(`recieverId is ${req.body.receiverId}`);
    const conversation = await Conversation.find({
        members: {$all:[req.body.senderId, req.body.receiverId]},
    });

    if(conversation.length > 0) {
        console.log("Conversation already exists");
        console.log(conversation);
        //return res.sendStatus(501
        res.status(409).json({
            message: 'Already Exists'
        })

        return ;
    }

    console.log(conversation);
   
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
});

app.get("/conversations/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]},
        });
        return res.status(200).json(conversation)
    } catch (error){
        return res.status(400).json({ error });

    }
});




app.get("/getallbookings", async(req, res) => {

    try {
        const bookings = await Booking.find()
        console.log(bookings)
        res.status(200).json(
            bookings,
        )
    } catch (error) {
        console.log('error')
    }
});

app.get("/allrooms", async(req, res) =>{

    try {
        const rooms = await Room.find()
        return res.json((rooms));
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

app.get("/getallusers", async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({ error });
    }
});


const port = process.env.PORT || 5001;




app.listen(port, () => console.log('node server started using nodemon'));