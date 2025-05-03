import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { SignOut } from '../redux/user/userSlice'

function Header() {

    const { currentUser } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/signout', {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (data.success) {
                dispatch(SignOut())
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-100 border-b-2 bg-gray-200 p-5 flex justify-between'>
            <div>
                <Link to={'/home'}>
                    <h2 className='text-sm md:text-lg font-bold text-blue-500 cursor-pointer'>Bloggs</h2>
                </Link>
            </div>
            <div className='flex text-sm gap-2 md:gap-4 md:text-lg items-center'>
                <p>Hi, {currentUser?.email?.slice(0, 5).toUpperCase()}</p>
                <p className='text-red-500 cursor-pointer' onClick={handleLogout}>logout</p>
            </div>
        </div>
    )
}

export default Header