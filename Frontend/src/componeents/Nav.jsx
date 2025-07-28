import React from 'react';
import dp from "../../public/dp.png";
import { FaHome } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  const navigate = useNavigate();

  const {userData} = useSelector((state)=> state.user)

  return ( 
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex
      justify-around items-center fixed bottom-[20px] rounded-full 
      shadow-2xl shadow-[#000000] z-[100]'>
      
      <div onClick={() => navigate('/')}
        className='cursor-pointer'>
        <FaHome className='text-white w-[25px] h-[25px]' />
      </div>
      <div onClick={() => navigate('/search')}
        className='cursor-pointer'>
        <IoSearch className='text-white w-[25px] h-[25px]' />
      </div>
      <div onClick={() => navigate('/create')}
        className='cursor-pointer'>
        <FaRegPlusSquare className='text-white w-[25px] h-[25px]' />
      </div> 
      <div onClick={() => navigate('/video')}
        className='cursor-pointer'>
        <RxVideo className='text-white w-[28px] h-[28px]' />
      </div>

      <div
        className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer 
          overflow-hidden'
        onClick={() => {
          if (userData && userData.userName) {
            navigate(`/profile/${userData.userName}`);
          }
        }}
      >
        <img
          src={userData?.profileImage || dp}
          alt="profile"
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default Nav;
