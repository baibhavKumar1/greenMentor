import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditProfile, GetUser } from '../redux/AuthReducer/action';

const Profile = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data,setData] = useState("")
  const token = useSelector((store) => store.AuthReducer.token) || localStorage.getItem("token");
  const user = useSelector((store) => store.AuthReducer.profile);

  useEffect(() => {
    dispatch(GetUser(token));
  }, [dispatch, token]);
  const handleSubmit=()=>{
    dispatch(EditProfile(token,data))
    setShow(!show)
    setData("")
  }

  
  return (
    <div className='h-screen flex flex-col mt-4  items-center'>
      {user?.name && (
        <div className='h-max border rounded p-10 flex-col flex w-[300px]'>
        <img src={`http://localhost:3000/${user.avatar}`} alt='img'/>
          <p>Name: {user.name.toUpperCase()}</p>
          <p>Email: {user.email}</p>
          
          <button onClick={()=>setShow(!show)} className='border w-full'>Edit</button>
          <div className={`${show==true ? "block":"hidden"} flex flex-col *:outline-none *:border *:p-1 *:rounded gap-2`}>
            <input className='mt-2' value={data} placeholder='Name' onChange={(e)=>setData(e.target.value)}/>
            <button onClick={handleSubmit}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
