import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate= useNavigate()
  const handleLogout=()=>{
     localStorage.removeItem('token')
     navigate('/')
  }
  return (
    <div className="flex justify-between p-2 *:text-xl">
        <Link to='/tasks'>TASK LIST</Link>
        <Link to='/profile'>PROFILE</Link>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar