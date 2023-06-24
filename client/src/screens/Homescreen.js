import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Room from '../components/Room';
import Error from '../components/Error';
import Loader from '../components/Loader';
import 'antd/dist/reset.css';
import {DatePicker, Space } from 'antd';
import moment from 'moment';
import Navbar from '../components/Navbar';


const { RangePicker } = DatePicker;
export default function Homescreen() {

    const[rooms, setRooms] = useState([])
    const[loading, setloading] = useState()
    const [error, seterror] = useState()
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [duplicaterooms, setduplicaterooms] = useState([])

    const [searchkey, setsearchkey] = useState('')
    const [type, settype] = useState('all')

    useEffect( ()=>{
        (async() => {try {
            setloading(true) 
            const data = await (await axios.get('/api/rooms/getallrooms')).data
            
            
            setRooms(data)
            setduplicaterooms(data)
            setloading(false)
            seterror(false)
        } catch (error) {
            seterror(true)
            console.log(error)
            seterror(false)

        }} ) ();
     },[]);

     function filterbydate(dates) {
        console.log(dates)
        console.log(moment(dates[0].$d).format('DD-MM-YYYY'))
        console.log(moment(dates[1].$d).format('DD-MM-YYYY'))
        setfromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
        settodate(moment(dates[1].$d).format('DD-MM-YYYY'))

        var temprooms = []
        var availability = false

        for(const room of duplicaterooms) {

            if(room.currentBookings.length > 0){


                for(const booking of room.currentBookings){

                   if (
                    !
                    moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(
                        booking.fromdate , 
                        booking.todate
                    )
                    && !moment(moment(dates[1].$d).format('DD-MM-YYYY')).isBetween(
                        booking.fromdate , booking.todate)
                   ) {

                    if (
                        moment(dates[0].$d).format('DD-MM-YYYY') !== booking.fromdate &&
                        moment(dates[0].$d).format('DD-MM-YYYY') !== booking.todate &&
                        moment(dates[1].$d).format('DD-MM-YYYY') !== booking.fromdate &&
                        moment(dates[1].$d).format('DD-MM-YYYY') !== booking.todate 
                    )
                    {
                        availability = true
                    }
                    
                   }
                }

            }

            if(availability === true || room.currentBookings.length===0)
            {
                temprooms.push(room)
            }

            setRooms(temprooms)
        }
     }

     function filterbysearch (){
        const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))

        setRooms(temprooms)
     }

     function filterByType (e) {

        settype(e)

        if(e !== "all"){
            const temprooms = duplicaterooms.filter(room => room.type.toLowerCase()===e.toLowerCase())

        setRooms(temprooms)
        }
        else{
            setRooms(duplicaterooms)
        }
     }


    // useEffect(async() => {

    //     try {
    //         const data = await (await axios.get('/api/rooms/getallrooms')).data
    //         console.log(data)
    //     } catch (error) {

    //         console.log(error)

    //     }

    // }, [])
  return (
    <>
    <Navbar/>
    
    <div className='container'>

        <div className='row mt-5 search' style={{padding:'15px 0px 15px 0px'}} >
            <div className='col-md-3 ' >
                <RangePicker format='DD-MM-YYYY' style={{padding:'6px 0px 6px 0px'}} onChange={filterbydate}/>

            </div>
            <div className='col-md-3'>
                <input type='text' className='form-control' placeholder='search rooms'
                value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterbysearch}></input>

            </div>
            <select  value={type} style={{padding:'6px 50px 6px 50px',}} onChange={(e)=>{filterByType(e.target.value)}}>
                <option value="all">All</option>
                <option value="double">Double</option>
                <option value="twin">Twin</option>
            </select>

        </div>
       
        <div className='row justify-content-center mt-5' >
        { loading ? 
        <Loader/> : 
         rooms.map((room) => {
            return (
                <div className='col-md-9 mt-3'>
                    <Room room={room} fromdate={fromdate} todate={todate}/>
                </div>
            );
         }
        )}

        </div>
    </div>
    </>
  );
}
