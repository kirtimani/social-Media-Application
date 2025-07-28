import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../REDUX/userSlice';
import { Server_URL } from '../App';
import axios from 'axios';

// Custom hook to fetch and set current user
const GetCurr = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${Server_URL}/api/user/current`, { withCredentials: true });
        dispatch(setUserData(result.data));
        console.log('Current user data fetched successfully:', result.data);
      } catch (error) {
        console.log('Error fetching current user:', error.response?.data || error.message);
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default GetCurr;
