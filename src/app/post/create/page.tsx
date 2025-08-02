'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '../../../components/PostForm';
import { createPost, clearError } from '../../../store/postsSlice';
import { PostFormData } from '../../../lib/validations';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import styles from './CreatePost.module.scss';

export default function CreatePost() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.posts);

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
    <div className={styles.createPostPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Create New Post</h1>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <p className={styles.errorText}>{error}</p>
          <button 
            className={styles.errorDismiss}
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