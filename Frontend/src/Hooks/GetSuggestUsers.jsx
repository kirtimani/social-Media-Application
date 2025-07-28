import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuggestedUsers } from '../REDUX/userSlice';
import { Server_URL } from '../App';
import axios from 'axios';

// Custom hook to fetch and set current user
const GetSuggestedUsers = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${Server_URL}/api/user/suggested`, { withCredentials: true });
        dispatch(setSuggestedUsers(result.data));
        console.log('Suggested users fetched successfully:', result.data);
      } catch (error) {
        console.log('Error fetching current user:', error.response?.data || error.message);
      }
    };
    fetchUser();
  }, [userData, dispatch]);
};

export default GetSuggestedUsers;
