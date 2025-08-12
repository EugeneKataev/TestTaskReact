'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { fetchPosts, deletePost } from '../../store/postsSlice';
import PostCard from '../PostCard/PostCard';
import { Post } from '../../types';
import {
  PostListContainer,
  LoadingState,
  ErrorState,
  EmptyState,
  RetryButton,
  PostListGrid,
} from './PostList.styles';

interface PostListProps {
  posts?: Post[];
  loading?: boolean;
  hasError?: boolean;
}

const PostList: React.FC<PostListProps> = ({ 
  posts: propsPosts, 
  loading: propsLoading,
  hasError = false 
}) => {
  const dispatch = useAppDispatch();
  
  const { posts: storePosts, loading: storeLoading, error } = useAppSelector((state) => state.posts);
  
  // Use props if provided, otherwise data from store
  const posts = propsPosts || storePosts;
  const loading = propsLoading !== undefined ? propsLoading : storeLoading;

  useEffect(() => {
    // Load posts only if they are not passed via props and store is empty
    if (!propsPosts && storePosts.length === 0 && !storeLoading) {
      dispatch(fetchPosts());
    }
  }, [dispatch, propsPosts, storePosts.length, storeLoading]);

  const handleDeletePost = async (postId: string) => {
    try {
      await dispatch(deletePost(postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <PostListContainer $loading={loading}>
        <LoadingState>
          <p>Loading...</p>
        </LoadingState>
      </PostListContainer>
    );
  }

  // Error state
  if (error || hasError) {
    return (
      <PostListContainer $hasError={hasError}>
        <ErrorState>
          <h3>Loading Error</h3>
          <p>{error || 'An error occurred while loading posts'}</p>
          <RetryButton 
            onClick={() => dispatch(fetchPosts())}
          >
            Try Again
          </RetryButton>
        </ErrorState>
      </PostListContainer>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <PostListContainer>
        <EmptyState>
          <h3>No posts to display</h3>
          <p>No one has created any posts yet. Be the first!</p>
        </EmptyState>
      </PostListContainer>
    );
  }

  return (
    <PostListContainer>
      <PostListGrid>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDeletePost}
            loading={loading}
          />
        ))}
      </PostListGrid>
    </PostListContainer>
  );
};

export default PostList;