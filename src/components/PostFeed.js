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
    <div className='grid items-start gap-4 mt-5 sm:mt-10 px-4 sm:px-0 sm:w-full md:w-3/4 lg:w-2/3 xl:w-6/7 2xl:w-7/8'>
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">The latest news</h1>
        </div>
      </div>
      <div className="grid gap-6 w-full">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProductFeed;
