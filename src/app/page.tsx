'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchPosts } from '@/store/postsSlice';
import PostList from '@/components/PostList/PostList';
import Link from 'next/link';
import { HomePage, HomeHeader, CreatePostButton, ErrorMessage, RetryButton } from './HomePage.styles';

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <HomePage>
      <HomeHeader>
        <h1>Blog App</h1>
        <p>Welcome! Read interesting posts and share your thoughts.</p>
        <CreatePostButton as={Link} href="/post/create">
          Create Post
        </CreatePostButton>
      </HomeHeader>

      <PostList posts={posts} loading={loading} />

      {error && (
        <ErrorMessage>
          <p>Error loading posts: {error}</p>
          <RetryButton onClick={() => dispatch(fetchPosts())}>
            Retry
          </RetryButton>
        </ErrorMessage>
      )}
    </HomePage>
  );
}