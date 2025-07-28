import React from 'react'
import logo from "../../public/favicon.png"
import logo1 from "../../public/logo1.png"
import { ClipLoader } from 'react-spinners';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useState } from 'react'
import { Server_URL } from '../App';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../REDUX/userSlice';
const SignIn = () => {

    const handleSignIn = async (e) => {
        setLoading(true);
        e.preventDefault();
        setErr("");
        try {

            const result = await axios.post(`${Server_URL}/api/auth/signin`, {
              
                userName,
                password
            }, { withCredentials: true });
            dispatch(setUserData(result.data));
            setLoading(false);
            // Optionally clear form or redirect
        } catch (error) {
            setErr(error.response?.data?.message || "An error occurred during sign in");
            console.log("Error during sign in:", error.response?.data || error.message);
            setLoading(false);
        }
    };

    const [inputClicked, setInputClicked] = useState({

        userName: false,
        password: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex
     flex-col justify-center items-center'>
            <div className='w-[90%] lg:max-w[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>
                <div className='w-full lg:w-[50%] h-full bg-white flex flex-col justify-center items-center p-[10px] gap-[20px]'>
                    <div className='flex gap-[10px] items-center text-[20px] 
                font-semibold mt-[30px]'>
                        <span>SignIn to</span>
                        <img src={logo} alt="" className='w-[45px]' />
                    </div>
                    
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                        onClick={() => setInputClicked({ ...inputClicked, userName: true })}>
                        <label htmlFor="userName" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
                        ${inputClicked.userName ? "top-[-15px]" : ""}`}> Enter User Name</label>
                        <input type="text" id='username' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
                            onChange={(e) => setUserName(e.target.value)} value={userName} />

                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                        onClick={() => setInputClicked({ ...inputClicked, password: true })}>
                        <label htmlFor="password" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
                        ${inputClicked.password ? "top-[-15px]" : ""}`}> Enter Password</label>
                        <input type={showPassword ? "text" : "password"} id='password' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!showPassword ? <IoEyeSharp className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]'
                            onClick={() => setShowPassword(true)} /> : <FaEyeSlash className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]'
                                onClick={() => setShowPassword(false)} />}
                              
                    </div>

                    <div className='w-[90%] px-[20px] cursor-pointer' onClick={()=> navigate("/forgot-password")}>Forgot Password</div>

                    {err && <p className='text-red-500'>{err}</p>}
                    <button className='w-[70%] px-[20px] py-[10px] bg-black text-white 
                font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleSignIn} disabled={loading}> {loading? <ClipLoader size={30} color='white'/>: "Sign In" }
                    </button>
                    <p className='cursor-pointer text-gray-800 ' onClick={()=> navigate("/signup")}>Want to Create a New Acccount! <span className='border-b-2 border-b-black pb-[3px] text-black'>Sign up</span></p>
                </div>

                <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] 
            text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>

                    <img src={logo1} alt="" className='w-[40%]' />
                    <p>Not just A Plateform , It's A VYBE</p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
