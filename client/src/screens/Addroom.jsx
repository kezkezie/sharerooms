import { React, useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2'

export default function Addroom() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [name, setname] = useState('')
    const [rentperday, setrentperday] = useState()
    const [maxaccount, setmaxaccount] = useState()
    const [description, setdescription] = useState()
    const [type, settype] = useState()
    const [phonenumber, setphonenumber] = useState()
    // const [imageurl1, setimageurl1] = useState()
    // const [imageurl2, setimageurl12] = useState()
    // const [imageurl3, setimageurl13] = useState()
    const [files, setFiles] = useState(null)

    const handleFileUpload = async (file) => {
        return new Promise(function (resolve, reject) {
            //Ideally these to lines would be in a .env file
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dap8jijxa/upload';
            const CLOUDINARY_UPLOAD_PRESET = 'tmtgx4vt';

            let formData = new FormData();
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder', 'realtor');
            //@ts-ignore
            formData.append('file', file);


            let request = new XMLHttpRequest();
            request.open('POST', CLOUDINARY_URL, true);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            request.onreadystatechange = () => {
                // File uploaded successfully
                if (request.readyState === 4 && request.status === 200) {
                    let response = JSON.parse(request.responseText);
                    resolve(response);
                }

                // Not succesfull, let find our what happened
                if (request.status !== 200) {
                    let response = JSON.parse(request.responseText);
                    let error = response.error.message;
                    alert('error, status code not 200 ' + error);
                    reject(error);
                }
            };

            request.onerror = (err) => {
                alert('error: ' + err);
                reject(err);
            };

            request.send(formData);
        });
    }

    async function addRoom() {


        const imageUrls = await Promise.all(Object.keys(files).map(async (key) => {
            const res = await handleFileUpload(files[key])
            return res.secure_url
        }))


        const newroom = {
            name,
            userid: localStorage.getItem("currentUser").data._id,
            rentperday,
            maxaccount,
            description,
            phonenumber,
            type,
            imageUrls,
        }
        console.log(newroom)

        try {
            setloading(true)
            const result = await (await axios.post('api/rooms/addroom', newroom)).data
            console.log(result)
            setloading(false)
            Swal.fire('congrats', 'Your room has been added', 'success').then(result => {
                window.location.href = '/home'
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('oops', 'Something went wrong', 'error')
        }

    }
    return (

         
       <>
             <div className='row'>
            <div className='col-md-5'>
                {loading && <Loader />}
                <input type='text' className='form-control' placeholder='room name'
                    value={name} onChange={(e) => { setname(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='rent per day'
                    value={rentperday} onChange={(e) => { setrentperday(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='max count'
                    value={maxaccount} onChange={(e) => { setmaxaccount(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='description'
                    value={description} onChange={(e) => { setdescription(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='phone number'
                    value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }}
                />

            </div>

            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='type'
                    value={type} onChange={(e) => { settype(e.target.value) }}
                />
                <input type='file' className='form-control' placeholder='Image URL 1' multiple
                    onChange={async (e) => {
                        setFiles(e.target.files)

                    }}
                />

                {
                    files != null && Object.keys(files).map((key, id) => (

                        <img style={{ height: '50px', width: '100px' }} id={id} src={URL.createObjectURL(files[key])} alt="" srcset="" />

                    ))
                }


                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={() => addRoom()}>
                        Add Room

                    </button>
                </div>


            </div>


        </div>
       </>
    )
}

