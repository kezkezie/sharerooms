import React, { useEffect, useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function Room({ room, fromdate, todate }) {
    const [show, setShow] = useState(false); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="row bs">
                <div className="col-md-4">
                    <img alt='#' src={room.imageUrls[0]} 
                    className="smallimg" />
                    
                </div>
                <div className="col-md-7 ">I
                    <h1>{room.name} </h1>
                    <b>
                        {" "}
                        <p> Max Count : {room.maxcount} </p>
                        <p>Phone Number : {room.phonenumber}</p>
                        <p>Type : {room.type}</p>
                    </b>
                    <div style={{ float: "right" }}>

                        {(fromdate && todate) && (
                            <Link to ={ `/book/${room._id}/${fromdate}/${todate}` }>
                            <button className='btn btn-primary '>Book Now</button>
                        </Link>

                        )}
                        
                        <div style={{'width': '5px'}}></div>
                        <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                    </div>
                </div>
            </div>



            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header >
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel prevLabel='' nextLabel=''>
                        {room.imageUrls.map(url => {
                            return <Carousel.Item>
                            <img
                                className="d-block w-100 bigimg"
                                src={url}
                                alt="#"
                            />
                            
                        </Carousel.Item>
                        })}


                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
