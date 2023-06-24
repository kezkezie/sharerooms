import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
  const[success, setsuccess] = useState( )
  const[loading, setloading] = useState(false)
  const [error, seterror] = useState()

  async function register(){
    
    if (password == cpassword){
      const user = {
        name,email,password,cpassword
      }

      try {
        setloading(true);
        const result = await axios.post('/api/user/register', user).data
        setloading(false);
        setsuccess(true);
        console.log(result)
      } catch (error) {

        console.log(error);
        setloading(false);
        seterror(true)
      }
    }
    else {
      alert('password not matched')
    }
  }
  return (
    <div>
      {loading && <Loader/>}
      {error && <Error/>}
      
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5' >
        {success && <Success message = 'Registration success'/>} 
          <div className='bs' style={{padding:'20px'}}>
            <h1 >Regiter</h1>
            <input type="text" className='form-control' placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)} }/>
            <input type="text" className='form-control' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='password'  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='confirm password' value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>

            <button className='btn btn-primary mt-3' onClick={register}>Regiter</button>
          </div>

        </div>

      </div>
    </div>
  )
}
