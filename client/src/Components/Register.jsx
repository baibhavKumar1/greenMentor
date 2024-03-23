import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Signup } from '../redux/AuthReducer/action';

export const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
  });
  const [avatar, setAvatar] = useState(null)

  const handleChange = (e) => {
    const { type, name, value } = e.target;
    if (type === "file") {
      setAvatar(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault()
    const formValue = new FormData();
    formValue.append('name', formData.name)
    formValue.append('email', formData.email)
    formValue.append('pass', formData.pass)
    formValue.append('avatar', avatar)
    dispatch(Signup(formValue))
  };
  return (
    <div className='h-screen flex flex-col gap-4 justify-center items-center border'>
    <p className='text-4xl'>Task List</p>
      <form onSubmit={handleSignup} className='border border-black rounded flex space-y-4 flex-col *:outline-none *:p-1 p-16 *:border *:border-black *:rounded'>
      <p className='border-none text-center text-xl'>Sign Up</p>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          fontSize={"16px"}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          fontSize={"16px"}
        />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          value={formData.pass}
          onChange={handleChange}
          fontSize={"16px"}
        />
        <input
          name="avatar"
          type="file"
          onChange={handleChange} 
          fontSize={"16px"}
        />
        <button onClick={handleSignup} className='bg-blue-100' type="submit">
          SIGN UP
        </button>
      </form>
    </div>
  );
};