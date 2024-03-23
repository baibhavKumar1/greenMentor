import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Signin, Signup } from '../redux/AuthReducer/action';
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch();
  const [showlogin,setShowLogin] =useState(false)
  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null)

  const handleRegisterChange = (e) => {
    const { type, name, value } = e.target;
    if (type === "file") {
      setAvatar(e.target.files[0]);
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };
  const handleChange = (e) => {
    const { type, name, value } = e.target;
    if (type === "file") {
      setAvatar(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSignin = (e) => {
    e.preventDefault()
    const formValue = new FormData();
    formValue.append('email', formData.email)
    formValue.append('password', formData.password)
    dispatch(Signin(formData,navigate))
    setFormData({email: '',
    password: ''})
  };
  const handleSignup = (e) => {
    e.preventDefault()
    const formValue = new FormData();
    formValue.append('name', registerData.name)
    formValue.append('email', registerData.email)
    formValue.append('password', registerData.password)
    formValue.append('avatar', avatar)
    dispatch(Signup(formValue,navigate))
    setRegisterData({name: '',
    email: '',
    password: ''})
  };
  return (
    <div className='h-screen flex flex-col gap-4 justify-center items-center border'>
      <p className='text-4xl'>Task List</p>
      {(showlogin==false) ? 
      <form onSubmit={handleSignup} className='border border-black rounded flex space-y-4 flex-col *:outline-none *:p-1 p-16 *:border *:border-black *:rounded'>
        <p className='border-none text-center text-xl'>Sign Up</p>
        <input
          name="name"
          placeholder="Name"
          value={registerData.name}
          onChange={handleRegisterChange}
          fontSize={"16px"}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleRegisterChange}
          fontSize={"16px"}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={handleRegisterChange}
          fontSize={"16px"}
        />
        <input
          name="avatar"
          type="file"
          onChange={handleRegisterChange}
          fontSize={"16px"}
        />
        <button onClick={handleSignup} className='bg-blue-100' type="submit">
          SIGN UP
        </button>
        <button  onClick={()=>setShowLogin(!showlogin)} className='border-none' href='/login'>Already Registered? <u>Login</u></button>
      </form> :
      <form onSubmit={handleSignin} className='border border-black rounded flex space-y-4 flex-col *:outline-none *:p-1 p-16 *:border *:border-black *:rounded'>
        <p className='border-none text-center text-xl'>Sign IN</p>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          fontSize={"16px"}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          fontSize={"16px"}
        />
        <button onClick={handleSignin} className='bg-blue-100' type="submit">
          SIGN IN
        </button>
        <button onClick={()=>setShowLogin(!showlogin)} className='border-none'>Not a User? <u>Register</u></button>
      </form>}

    </div>
  );
};

export default Register