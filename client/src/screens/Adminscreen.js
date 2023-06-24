import { React, useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2'


export default function Adminscreen() {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).data.isAdmin) {
            window.location.href = '/home'
        }
    }, [])
    return (
        <>
            <Navbar />
            <div className='ml-3 mt-3 mr-3 bs'>
                <h2 className='text-center'>Admin Panel</h2>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'Bookings',
                            key: '1',
                            children: <Adminbookings />,
                        },
                        {
                            label: 'Rooms',
                            key: '2',
                            children: <Adminrooms />,
                        },

                        {
                            label: 'Users',
                            key: '3',
                            children: <Users />,
                        },
                        
                    ]}
                />
            </div>
        </>
    )
}


export function Adminbookings() {

    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [bookings, setbookings] = useState([])


    //const getAllBookings = () => fetch(`/api/bookings/getallbookings`).then(res => res.json()).then((data) => data).catch(err => console.log(err))

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await (await axios.get("/getallbookings")).data
                    setbookings(data)
                    setloading(false)
                    console.log(data)
                } catch (error) {
                    console.log(error)
                    setloading(false)
                    seterror(error)
                }
            }
        )();
    }, [])

    // useEffect(() => {
    //     getAllBookings().then(data => {
    //         setbookings(data)
    //         setloading(false)
    //         console.log(data)
    //     })
    // }, [])
    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Bookings</h1>
                {loading && <Loader />}

                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export function Adminrooms() {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [rooms, setrooms] = useState([])


    //const getAllBookings = () => fetch(`/api/bookings/getallbookings`).then(res => res.json()).then((data) => data).catch(err => console.log(err))

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await (await axios.get("/allrooms")).data
                    setrooms(data)
                    setloading(false)
                    console.log(data)
                } catch (error) {
                    console.log(error)
                    setloading(false)
                    seterror(error)
                }
            }
        )();
    }, [])
    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Rooms</h1>
                {loading && <Loader />}

                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                            </tr>
                        }))
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export function Users() {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [users, setusers] = useState([])

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await (await axios.get("/getallusers")).data
                    setusers(data)
                    setloading(false)
                    console.log(data)
                } catch (error) {
                    console.log(error)
                    setloading(false)
                    seterror(error)
                }
            }
        )();
    }, [])
    return (
        <div className='row'>
            <div className='col-md-10'>

                <h1>Users</h1>
                {loading && <Loader />}

                <table className='table table-dark table-bordered'>

                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>

                    </thead>

                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'} </td>
                            </tr>
                        }))
                        }

                    </tbody>

                </table>
            </div>
        </div>
    )
}




