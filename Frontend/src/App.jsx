import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Forgot from './pages/Forgot'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import GetCurr from './Hooks/GetCurr'
import GetSuggestedUsers from './Hooks/GetSuggestUsers'
import Profile from './pages/Profile'



export const Server_URL = "http://localhost:8000"
const App = () => {
  GetCurr();
  GetSuggestedUsers(); 
  const {userData} = useSelector((state) => state.user);
  return (
    <div>
      <Routes>
        <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/"}/> }/>
        <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
        <Route path='/forgot-password' element={!userData?<Forgot/>:<Navigate to={"/"}/>}/>
        <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
        <Route path="/profile/:userName" element={userData?<Profile/>:<Navigate to={"/signin"}/>}/>





        {/* page not found  */}
        <Route path='*' element={<h1 className='text-3xl text-center mt-10'>Oooo Page Not Found</h1>}/>
        

        

      </Routes>
    </div>
  )
}

export default App
