'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchPosts, deletePost } from '@/store/postsSlice';
import PostCard from './PostCard';
import { Post } from '@/types';
import styles from './PostList.module.scss';

interface PostListProps {
  posts?: Post[];
  loading?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts: propsPosts, loading: propsLoading }) => {
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
      <div className={styles.postListContainer}>
        <div className={styles.loadingState}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.postListContainer}>
        <div className={styles.errorState}>
          <h3>Loading Error</h3>
          <p>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={() => dispatch(fetchPosts())}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={styles.postListContainer}>
        <div className={styles.emptyState}>
          <h3>No posts to display</h3>
          <p>No one has created any posts yet. Be the first!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.postListContainer}>
      <div className={styles.postListGrid}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDeletePost}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;