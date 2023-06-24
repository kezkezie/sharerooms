import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import { Divider, Space, Tag } from 'antd';




export default function Profilescreen() {

  const user = JSON.parse(localStorage.getItem("currentUser"))
  console.log(user)

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className='ml-3 mt-3'>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: 'Profile',
              key: '1',
              children: <Profile currentuser={user} />,
            },
            {
              label: 'Bookings',
              key: '2',
              children: < MyBookings />,
            },

          ]}
        />
      </div>
    </>

  )
}

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const [bookings, setbookings] = useState([])
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  useEffect(() => {
    (
      async () => {
        try {
          setloading(true)
          const { data } = await axios.get(`/api/bookings/${user.data._id}`)
          console.log(data)
          setbookings(data)
          setloading(false)
        } catch (error) {
          console.log(error)
          setloading(false)
          seterror(error)
        }
      }
    )();

  }, [])

  async function cancelBooking(bookingid, roomid) {

    try {
      setloading(true)
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingid,
        roomid
      }).data
      console.log(result)
      setloading(false)
      Swal.fire('congrats', 'Your booking has been cancelled', 'success').then(result => {
        window.location.reload()
      })
    } catch (error) {
      console.log(error)
      setloading(false)
      Swal.fire('oops', 'Something went wrong', 'error')
    }
  }

  return (
    <div>
      <div className='row'>
        <div className='col-ml-6'>
          {loading && (<Loader />)}

          {bookings.length === 0 ? <h1>No Bookings</h1> : bookings && (bookings.map(booking => {
            return <div className='bs'>
              <h1>{booking.room}</h1>
              <p> BookingId : {booking._id}</p>
              <p> Check In : {booking.fromdate}</p>
              <p> Check Out : {booking.todate}</p>
              <p> Amount : {booking.totalamount}</p>
              <p> 
                  <b>Status</b> : {" "}
                  {booking.status == 'cancelled' ? <Tag color="red">CANCELLED</Tag> :  <Tag color="green">CONFIRM</Tag>}
              </p>


              {booking.status !== 'cancelled' && (<div className='text-right'>

                <button
                  class='btn btn-primary'
                  onClick={() => { cancelBooking(booking._id, booking.roomid) }}
                >
                  CANCEL BOOKING

                </button>

              </div>)}
            </div>
          }))}

        </div>
      </div>
    </div>
  )
}

export function Profile({ currentuser }) {
  return (
    <div>
      <h1> My Profile</h1>
      <br />
      <h1>Name : {currentuser.data.name}</h1>
      <h1>Email : {currentuser.data.email}</h1>
      <h1>isAdmin : {currentuser.data.isAdmin ? 'YES' : 'NO'}</h1>
    </div>
  )
}

