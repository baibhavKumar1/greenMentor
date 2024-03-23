import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../redux/AuthReducer/action';

const Profile = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const token = useSelector((store) => store.AuthReducer.token) || localStorage.getItem("token");
  const user = useSelector((store) => store.AuthReducer.profile);

  useEffect(() => {
    dispatch(GetUser(token));
  }, [dispatch, token]);

  useEffect(() => {
    setData(user?.user);
  }, [user]); // Update data when user state changes

  console.log(user);
  
  return (
    <div className='h-screen'>
      {data?.name && (
        <div className='h-max'>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <img src={`http://localhost:3000/${data.avatar}`} alt='img'/>
          <button>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
