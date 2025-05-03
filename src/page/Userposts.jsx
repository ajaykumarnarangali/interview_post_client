
import Card from '../component/Card';
import { useEffect, useState } from 'react';
import Header from '../component/Header';
import Loader from '../component/Loader'

function MyPosts() {

  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllPosts();
  }, [])

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/posts', {
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
      setAllPosts(data?.userPosts)
    } catch (error) {
      setError(error?.message || 'Internal issue');
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Your Blog Posts</h1>
        {error && (
          <p className="text-center text-red-500 mb-4">{error}</p>
        )}
        {allPosts.length === 0 && !error && (
          <p className="text-center text-gray-500">You haven't added any posts yet.</p>
        )}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post, ind) => (
            <Card setAllPosts={setAllPosts} post={post} key={ind} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyPosts;
