import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { SignIn } from '../redux/user/userSlice'
import Loader from '../component/Loader';

function Signin() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const { currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home')
    }
  }, [currentUser])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    setIsloading(true);
    try {
      const res = await fetch('/api/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success == false) {
        setError(data?.message)
      }
      dispatch(SignIn(data.user))
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }finally{
      setIsloading(false);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='min-h-screen w-full p-2 flex justify-center items-center bg-gray-100'>
      <div className='flex p-6 max-w-3xl md:w-[400px] w-full bg-white shadow-md rounded-md flex-col md:flex-row md:items-center gap-6'>
        <form className='flex flex-col gap-4  md:w-[400px]' onSubmit={handleSubmit}>
          <h1 className='text-center text-xl font-bold'>Login</h1>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Email:</label>
            <input
              type="email"
              placeholder='Enter email address'
              className='p-2 border rounded w-full'
              onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Password:</label>
            <input
              type="password"
              placeholder='Enter password'
              className='p-2 border rounded w-full'
              onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
            />
          </div>
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <p className='text-sm'>You don't have an account ? <Link className='text-blue-500' to={'/sign-up'}>Sign up</Link></p>
          <button
            type='submit'
            className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition'
          >
            Login
          </button>
        </form>
      </div>
    </div>

  )
}

export default Signin