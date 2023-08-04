import React, { useEffect, useState } from 'react';
import Post from './Posts';

const ProductFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='grid items-start gap-4 mt-10 w-3/4'>
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl">The latest fund news</h1>
        </div>
      </div>
      <div className="grid gap-6 w-5/6">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProductFeed;
