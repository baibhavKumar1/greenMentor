import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Logout } from "../redux/AuthReducer/action";

const Navbar = () => {
  const {isAuth,name,token} = useSelector((store)=>store.AuthReducer)
  const dispatch = useDispatch();
  const navigate= useNavigate()
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
        <a href="/">Register</a>
        <a href="/login">Login</a>
        </div>}
    </div>
  )
}

export default Navbar