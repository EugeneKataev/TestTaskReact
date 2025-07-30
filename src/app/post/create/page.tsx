'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import PostForm from '../../../components/PostForm';
import { createPost, clearError } from '../../../store/postsSlice';
import { PostFormData } from '../../../lib/validations';
import { RootState, AppDispatch } from '../../../lib/store';
import '../../../styles/CreatePost.css';

export default function CreatePost() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.posts);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (formData: PostFormData) => {
    dispatch(createPost(formData));
  };

  // Track state changes for redirection after successful creation
  const prevLoadingRef = React.useRef(loading);
  
  useEffect(() => {
    // If loading is complete and there's no error, the post was created successfully
    if (prevLoadingRef.current && !loading && !error) {
      router.push('/');
    }
    prevLoadingRef.current = loading;
  }, [loading, error, router]);

  return (
    <div className="create-post-page">
      <div className="page-header">
        <h1 className="page-title">Create New Post</h1>
      </div>

      {error && (
        <div className="error-banner">
          <p className="error-text">{error}</p>
          <button 
            className="error-dismiss"
            onClick={() => dispatch(clearError())}
          >
            ×
          </button>
        </div>
      )}

      <PostForm
        onSubmit={handleSubmit}
        loading={loading}
        submitButtonText="Create Post"
      />
    </div>
  );
}