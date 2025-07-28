import React from 'react'
import LeftHome from '../componeents/LeftHome'
import Feed from '../componeents/Feed'
import RightHome from '../componeents/RightHome'

const Home = () => {
  return (
    <div className='w-full flex justify-center items-center '>
        <LeftHome/>
        <Feed/>
        <RightHome/>
       
    </div>
  )
}

export default Home
