const express = require("express");
const router = express.Router();

const Booking = require('../models/booking')
const Room = require("../models/rooms")
const stripe = require('stripe')('sk_test_51ND46xAAoR2WWTTxPy5FfXEYJBkqid4KTVA33JpL7FqzaLb51hii7KPSNKYi8HdlOQb2EMUtd7rtwVwEPD26UWYw00SnYBnA8j');
const { v4: uuidv4 } = require('uuid');
// const { route } = require("./roomsRoute");
//const moment = require("moment");



router.post("/bookroom", async (req, res) => {

    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
    } = req.body;

    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create(
            {
                amount: totalamount,
                customer: customer.id,
                currency: 'usd',
                receipt_email: token.email
            }, {
            idempotencyKey: uuidv4()
        }
        )

        console.log(payment)

        if (payment) {
            try {
                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid,
                    fromdate: fromdate,
                    todate: todate,
                    totalamount,
                    totaldays,
                    transactionId: '1234',
                })
                const bookingmodel = await newbooking.save()

                const roomtemp = await Room.findOne({ _id: room._id });


                const newCurrentbooking = Object.assign(roomtemp, {
                    currentBookings: [
                        ...roomtemp.currentBookings,
                        {
                            bookingid: bookingmodel._id,
                            fromdate: fromdate,
                            todate: todate,
                            userid: userid,
                            status: newbooking.status
                        }
                    ]
                });

                await newCurrentbooking.save()

                res.send('Room Booked Successfully')

            } catch (error) {
                console.log(`error is ${error}`);
                return res.status(400).json({ error });

            }

        }

        res.send('Payment successfull, your room is booked')

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error });

    }






});

router.get("/:id", async (req, res) => {


    const { id } = req.params

    try {

        const bookings = await Booking.find({ userid: id })
        res.send(bookings)

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error });

    }
});

router.post("/cancelbooking", async (req, res) => {
    const { bookingid, roomid } = req.body

    try {
        const bookingitem = await Booking.findOne({ _id: bookingid })

        bookingitem.status = 'cancelled'
        await bookingitem.save()

        const room = await Room.findOne({ _id: roomid })

        const bookings = room.currentBookings

        const temp = bookings.filter( booking => booking.bookingid.toString()!==bookingid)

        room.currentBookings = temp

        await room.save()

        res.send('your booking is xcancelled sucessfully')
    } catch (error) {
        return res.status(400).json({ error });

    }
});

router.get("/getallbookings", async(req, res) => {

    try {
        const bookings = await Booking.find()
        console.log(bookings)
        res.status(200).json({
            message: 'hey',
            bookings,
        })
    } catch (error) {
        console.log('error')
    }
});

router.get("/hello", async(req, res) => {

   
        
        res.send("bookings")
    
});
module.exports = router;