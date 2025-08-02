'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchPosts } from '@/store/postsSlice';
import PostList from '@/components/PostList';
import Link from 'next/link';
import styles from './HomePage.module.scss';

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className={styles.homePage}>
      <div className={styles.homeHeader}>
        <h1>Blog App</h1>
        <p>Welcome! Read interesting posts and share your thoughts.</p>
        <Link href="/post/create" className={styles.createPostButton}>
          Create Post
        </Link>
      </div>

      <PostList posts={posts} loading={loading} />

      {error && (
        <div className={styles.errorMessage}>
          <p>Error loading posts: {error}</p>
          <button onClick={() => dispatch(fetchPosts())} className={styles.retryButton}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
}