import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import ChatsPage from './screens/Chatscreen';
import Messanger from './screens/messanger/Messanger';


function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <Routes>
        <Route path="/messanger" element={<Messanger />}/>
        <Route path="/chatpage" element={<ChatsPage />}/>
        <Route path="/" element={<Homescreen />}/>
        <Route path="home" element={<Homescreen />}/>
        <Route path= "book/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
        <Route path="register" element={<RegisterScreen/>}/>
        <Route path="login" element={<LoginScreen/>}/>
        <Route path="profile" element={<Profilescreen/>}/>
        <Route path="admin" element={<Adminscreen/>}/>
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
