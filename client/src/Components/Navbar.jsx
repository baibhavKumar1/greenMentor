import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Logout, Relogin } from "../redux/AuthReducer/action";
import { useEffect } from "react";

const Navbar = () => {
  const {isAuth,name} = useSelector((store)=>store.AuthReducer)
  const token = useSelector((store)=>store.AuthReducer.token) || localStorage.getItem("token");
  //console.log(token);
  const dispatch = useDispatch();
  const navigate= useNavigate()
  useEffect(()=>{
    dispatch(Relogin(token))
  },[token])
  const handleLogout=()=>{
     localStorage.removeItem('token')
     dispatch(Logout(token))
     navigate('/')
  }
  return (
    <div className="flex justify-between p-2 *:text-xl">
        <Link to='/tasks'>TASK LIST</Link>
        <Link to='/profile'>PROFILE</Link>
        {isAuth==true ? <button onClick={handleLogout}>Logout {name}</button>: 
        <div className="flex gap-2">
        <a href="/">Join</a>
        </div>}
    </div>
  )
}

export default Navbar