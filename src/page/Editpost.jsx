import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from '../component/Loader';

function Feedback() {

    const [form, setForm] = useState({
        title: '',
        content: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        fetchPost(id);
    }, [id])

    const fetchPost = async (id) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                return;
            }
            console.log(data);
            setForm({
                title: data?.userPost?.title,
                content: data?.userPost?.content
            })
        } catch (error) {
            setError(error?.message || 'Internal issue');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                return;
            }
            navigate('/user-posts');
        } catch (error) {
            setError(error?.message || 'Internal issue');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen w-full bg-gray-100">
            <div className="flex justify-center items-center min-h-screen p-4">
                <form
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold text-center">Let's think creative</h2>

                    <input
                        type="text"
                        name="title"
                        value={form?.title}
                        placeholder="Enter blog title"
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="border p-2 rounded w-full"
                        required
                    />

                    <textarea
                        name="content"
                        value={form?.content}
                        className="border p-2 rounded w-full min-h-[100px] resize-none"
                        placeholder="Write your thought here..."
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        required
                    />

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Edit blog
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Feedback;
