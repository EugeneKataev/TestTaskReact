'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchPosts } from '@/store/postsSlice';
import PostList from '@/components/PostList';
import Link from 'next/link';
import '@/styles/HomePage.css';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="homePage">
      <div className="homeHeader">
        <h1>Blog App</h1>
        <p>Welcome! Read interesting posts and share your thoughts.</p>
        <Link href="/post/create" className="createPostButton">
          Create Post
        </Link>
      </div>

      <PostList posts={posts} loading={loading} />

      {error && (
        <div className="error-message">
          <p>Error loading posts: {error}</p>
          <button onClick={() => dispatch(fetchPosts())} className="retry-button">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
