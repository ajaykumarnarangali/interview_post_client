import React from 'react'
import { Link } from 'react-router-dom';

function Card({ post, setAllPosts }) {

    const editImage = 'edit.png'

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/posts/${post?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (data.success === false) {
                return;
            }
            console.log(data);
            setAllPosts((prevPosts) => prevPosts.filter((p) => String(p._id) !== String(post._id)));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div key={post._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className='flex item-center justify-between'>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <div className='flex gap-4'>
                    <Link to={`/edit-post/${post?._id}`}><img src={editImage} className='w-5 h-5' /></Link>
                    <p className='text-red-600 font-bold text-sm cursor-pointer' onClick={handleDelete}>X</p>
                </div>
            </div>
            <p className="text-gray-700 text-sm">{post.content}</p>
        </div>
    )
}

export default Card