import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import Loader from '../components/Loader';
import Error from '../components/Error';
import StripeCheckout from 'react-stripe-checkout';
import Navbar from '../components/Navbar';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom';

export default function Bookingscreen() {
    const [room, setroom] = useState([]);
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState()
    const { roomid, fromdate, todate } = useParams();
    const navigate = useNavigate()

    var toDate = moment(todate, "DD.MM.YYYY");
    var fromDate = moment(fromdate, "DD.MM.YYYY");

    const totaldays = moment.duration(toDate.diff(fromDate)).asDays() + 1
    const [totalamount, settotalamount] = useState()




    useEffect(() => {

        if (!localStorage.getItem('currentUser')) {
            navigate('/login')
            //window.location.reload = '/login'
        }
        (async () => {
            try {
                setloading(true)
                const data = (await axios.post('/api/rooms/getroombyid', { roomid })).data;
                settotalamount(data.rentperday * totaldays)
                setroom(data)
                const resp = await axios.get(`/api/user/getuser/${data.userid}`)
                setUser(resp.data)
                console.log(data)
                setloading(false)
                seterror(false)
            } catch (error) {
                seterror(true)
                seterror(false)

                console.log(error)


            }
        })();
    }, []);

    // async function bookRoom() {
    //     const bookingDetails = {
    //         room,
    //         userid: JSON.parse(localStorage.getItem('currentUser')).data._id,
    //         fromdate,
    //         todate,
    //         totalamount,
    //         totaldays
    //     }
    //     try {
    //         const result = await axios.post('/api/bookings/bookroom', bookingDetails)
    //     } catch (error) {

    //     }
    // }



    async function onToken(token) {
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser')).data._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }
        try {
            setloading(true);
            const result = await axios.post('/api/bookings/bookroom', bookingDetails, token);
            setloading(false);
            Swal.fire('Congratulations', 'Room booked succefully', 'success').then(result =>
                window.location.href = '/home')
        } catch (error) {
            console.log(error)
            setloading(false);
            Swal.fire('oops!', 'Something went wrong', 'error')
        }

    }

    const ln = JSON.parse(localStorage.getItem('currentUser')).data.name
    console.log(ln)
    return (
        <div>
            <Navbar />
            {loading ? <h1> <Loader /></h1> : room ? <div>
                <div className='row justify-content-center mt-5 '>
                    <div className='col-md-5'>
                        <h1> {room.name}</h1>
                        <img alt='' src={room.imageUrls[0]} className='bigimg' />

                    </div>
                    <div className='col-md-5' >
                        <div >
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).data.name}</p>
                                <p>From Date : {fromdate}</p>
                                <p>To Date : {todate}</p>
                                <p>Max Count : {room.maxaccount}</p>
                                <p>Owner : {user.name}</p>
                            </b>
                        </div>
                        <div >
                            <b>
                                <h1>Amount</h1>
                                <hr/>
                                <p>Total days : {totaldays} </p>
                                <p>Rent per day : ${room.rentperday}</p>
                                <p>Total Amount : ${totalamount}</p>
                            </b>
                        </div>
                        <div >


                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency='USD'
                                stripeKey="pk_test_51ND46xAAoR2WWTTxvfB14Co4QkLnl9Nsol8TyzYxgNR2PcG9lWyjsRiondEbTtGYpMsxzk0a2cDxATjcDadN9v2V00edsuKWQD"
                            >
                                <button className='btn btn-primary' >Pay Now</button>
                            </StripeCheckout>

                            <div style={{ width: 10 }}></div>


                            <Link
                                to={`/messanger`}
                                state={{
                                    userId: user._id
                                }}
                                className='btn 
                                btn-primary' 
                            >Chat</Link>

                        </div>

                    </div>

                </div>

            </div> :
                <Error />}
            {/* <h1> Room id = {roomid}</h1> */}
        </div>
    )
}
