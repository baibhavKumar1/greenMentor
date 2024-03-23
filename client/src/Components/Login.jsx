import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Signin } from '../redux/AuthReducer/action';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault()
    const formValue = new FormData();
    formValue.append('email', formData.email)
    formValue.append('password', formData.password)
    dispatch(Signin(formData,navigate))
  };
  return (
    <div className='h-screen flex flex-col gap-4 justify-center items-center border'>
      <p className='text-4xl'>Task List</p>
      <form onSubmit={handleSignup} className='border border-black rounded flex space-y-4 flex-col *:outline-none *:p-1 p-16 *:border *:border-black *:rounded'>
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
        <button onClick={handleSignup} className='bg-blue-100' type="submit">
          SIGN IN
        </button>
        <a href='/register' className='border-none'>Not a User? <u>Register</u></a>
      </form>
    </div>
  );
};

export default Login