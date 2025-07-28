import React from 'react'
import logo from "../../public/logo1.png"
import { FaRegHeart } from "react-icons/fa";
import dp from "../../public/dp.png";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Server_URL } from '../App';
import { setUserData } from '../REDUX/userSlice';
import OtherUser from './OtherUser';
function LeftHome() {


  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${Server_URL}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.log("Error during logout:", error.response?.data || error.message);
      // Handle error, e.g., show a notification
    }
  }
    const {userData,suggestedUsers} = useSelector((state) => state.user);
  return (
    <div className='w-[25%] hidden lg:block min-h-[100vh] bg-[black] border-r-2 border-gray-900'>

      <div className='w-full h-[100px] flex items-center justify-between p-[20px]'>
        <img src={logo} alt="" className='w-[80px]' />
        <div className=''>
          <FaRegHeart className='text-white w-[25px] h-[25px]' />
        </div>
      </div>
      <div className='flex items-center w-full justify-between gap-[10px] px-[10px] border-b-2 border-b-gray-900 py-[10px]'>
        <div className='flex items-center gap-[10px] '>
        <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer 
        overflow-hidden'>
          <img src={userData?.profileImage || dp}  alt="" className='w-full object-cover'/>
        </div>
      <div>
          <div className='text-[18px] text-white font-semibold'>
            {userData?.userName || "User"}</div>
          <div className='text-[15px] text-gray-400 font-semibold'>
            {userData?.name || "@username"}</div>
      </div>
        </div>

        <div className='text-blue-500 font-semibold cursor-pointer' 
        onClick={handleLogout}>
          Logout
        </div>
      </div>

      <div className='w-full flex flex-col gap-[20px] p-[20px]'>
          <h1 className='text-[white] text-[19px]'>suggested Users </h1>
         {(Array.isArray(suggestedUsers) ? suggestedUsers : []).slice(0, 3).map((user, index) => (
           <OtherUser key={user._id || user.id || index} user={user} />
         ))}
      </div>
    </div>
  )
} 

export default LeftHome
