'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchPosts, deletePost } from '@/store/postsSlice';
import PostCard from './PostCard';
import { Post } from '@/types';
import '../styles/PostList.css';

interface PostListProps {
  posts?: Post[];
  loading?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts: propsPosts, loading: propsLoading }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { posts: storePosts, loading: storeLoading, error } = useSelector((state: RootState) => state.posts);
  
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
    dispatch(deletePost(postId));
  };

  if (loading) {
    return (
      <div className="post-list-container">
        <div className="loading-state">
          <p>Loading...</p>
        </div>

      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="post-list-container">
        <div className="error-state">
          <h3>Loading Error</h3>
          <p>{error}</p>
          <button 
            className="retry-button"
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
      <div className="post-list-container">
        <div className="empty-state">
          <h3>No posts to display</h3>
          <p>No one has created any posts yet. Be the first!</p>
        </div>

      </div>
    );
  }

  return (
    <div className="post-list-container">
      <div className="post-list-grid">
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