import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
    return (
        <div className='px-8 md:px-40 py-16 text-center flex flex-col gap-4 mt-24'>
            <h2 className='font-bold text-3xl'>Hi, welcome to Bloggs</h2>
            <p className='text-gray-500 max-w-3xl mx-auto'>
                Easily share your thoughts through our blog tool — add a title, write your content.
                Your voice matters and helps us create a richer, more engaging platform for everyone.
            </p>
            <div className='flex justify-center gap-4 mt-6'>
                <Link
                    to="/user-posts"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Show all posts
                </Link>
                <Link
                    to="/add-post"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add post
                </Link>
            </div>
        </div>
    );
}

export default Banner;
