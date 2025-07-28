import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { Server_URL } from '../App';

const Forgot = () => {
    const [step, setStep] = useState(1);
    const [inputClicked, setInputClicked] = useState({
        email: false,
        otp: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState("");

    const handleStep1 = async () => {
        setLoading(true);
        setErr("");
        try {
            const result = await axios.post(`${Server_URL}/api/auth/sendOtp`, { email }, { withCredentials: true });
            console.log("OTP sent successfully:", result.data);
            setStep(2);
        } catch (error) {
            console.log("Error during sending OTP:", error.response?.data || error.message);
            setErr(error.response?.data?.message || "An error occurred while sending OTP");
        } finally {
            setLoading(false);

        }
    };

    const handleStep2 = async () => {
        setErr("");
        setLoading(true);
        try {
            const result = await axios.post(`${Server_URL}/api/auth/verifyOtp`, { email, otp }, { withCredentials: true });
            console.log("OTP verified successfully:", result.data);
            setStep(3);
        } catch (error) {
            console.log("Error during OTP verification:", error.response?.data || error.message);
            setErr(error.response?.data?.message || "An error occurred while verifying OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleStep3 = async () => {
        setErr("");
        if (newPassword !== confirmPassword) {
           
            return setErr("Passwords do not match");
        }
        setLoading(true);
        try {
            const result = await axios.post(`${Server_URL}/api/auth/resetPassword`, { email, newPassword }, { withCredentials: true });
            console.log("Password reset successful:", result.data);
            alert("Password reset successful! You can now log in.");
            setStep(1);
        } catch (error) {
            console.log("Error during password reset:", error.response?.data || error.message);
            setErr(error.response?.data?.message || "An error occurred while resetting password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
            {step === 1 && (
                <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
                    <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
                    <div className='relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, email: true })}>
                        <label htmlFor="email" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? "top-[-15px]" : ""}`}>
                            Enter Your Email
                        </label>
                        <input type="email" id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setEmail(e.target.value)}
                         value={email} />

                    </div>
                         {err && <p className='text-red-500 mt-2'>{err}</p>}

                    <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleStep1} disabled={loading}>
                        {loading ? <ClipLoader size={30} color='white' /> : "Send OTP"}
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
                    <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
                    <div className='relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, otp: true })}>
                        <label htmlFor="otp" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp ? "top-[-15px]" : ""}`}>
                            Enter OTP
                        </label>
                        <input type="text" id='otp' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setOtp(e.target.value)} value={otp} />
                    </div>
                    {err && <p className='text-red-500 mt-2'>{err}</p>}
                    <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleStep2} disabled={loading}>
                        {loading ? <ClipLoader size={30} color='white' /> : "Submit OTP"}
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
                    <h2 className='text-[30px] font-semibold'>Reset Password</h2>
                    <div className='relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}>
                        <label htmlFor="newPassword" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword ? "top-[-15px]" : ""}`}>
                            Enter New Password
                        </label>
                        <input type="password" id='newPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                    </div>
                    
                    <div className='relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, confirmPassword: true })}>
                        <label htmlFor="confirmPassword" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.confirmPassword ? "top-[-15px]" : ""}`}>
                            Confirm Password
                        </label>
                        <input type="password" id='confirmPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </div>
                    {err && <p className='text-red-500 mt-2'>{err}</p>}
                    <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleStep3} disabled={loading}>
                        {loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Forgot;
