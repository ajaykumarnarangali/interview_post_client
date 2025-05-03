import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../component/Loader';

function Signup() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success == false) {
        setError(data?.message)
      }
      navigate('/');
    } catch (error) {
      setError(error?.message || "internal issue");
    }finally{
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='min-h-screen w-full p-2 flex justify-center items-center bg-gray-100'>
      <div className='flex p-6 max-w-3xl md:w-[400px] w-full bg-white shadow-md rounded-md flex-col md:flex-row md:items-center gap-6'>
        <form className='flex flex-col gap-4  md:w-[400px]' onSubmit={handleSubmit}>
          <h1 className='text-center text-xl font-bold'>Register</h1>
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
          <p className='text-sm'>You already have an account ? <Link className='text-blue-500' to={'/'}>Sign In</Link></p>
          <button
            type='submit'
            className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup