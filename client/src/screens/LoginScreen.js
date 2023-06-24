import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';


export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const navigate = useNavigate()

    async function login() {


        const user = {
            email, password
        }

        try {
            setloading(true)
            const result = await axios.post('/api/user/login', user)
            const chatresponse = await axios.post('/api/user/authenticate',{ username: user.email })
            setloading(false)

            localStorage.setItem('currentUser', JSON.stringify({...result, ...chatresponse.data}));
            navigate('/home') 




            console.log(result)
        } catch (error) {

            console.log(error)
            setloading(false)
            seterror(true)
        }

    }
    return (
        <div>
             <div style={{ display: 'flex',justifyContent:'center' ,marginTop: '200px', }}>
            {loading && <Loader />}
            </div>
         
            <div className='row justify-content-center mt-5'>
           
                <div className='col-md-5 mt-5' >
                    {error && <Error message='Invalid credentials' />}
                    <div className='bs' style={{ padding: '20px' }}>
                        <h1 >Login</h1>
                        <input type="text" className='form-control' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="text" className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

                        <button className='btn btn-primary mt-3' onClick={login}>Login</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
