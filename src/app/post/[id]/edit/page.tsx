'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchPostById, updatePost, clearCurrentPost } from '@/store/postsSlice';
import PostForm from '@/components/PostForm';
import { PostFormData } from '@/types';
import styles from './EditPost.module.scss';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postId = params.id as string;

  const { currentPost, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, postId]);

  const handleSubmit = async (formData: PostFormData) => {
    setIsSubmitting(true);
    try {
      await dispatch(updatePost(postId, formData));
      router.push(`/post/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingState}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorState}>
          <h2>Post Not Found</h2>
          <p>{error || 'The requested post could not be found.'}</p>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const initialData = {
    title: currentPost.title,
    content: currentPost.content,
    author: currentPost.author
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Edit Post</h1>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Back
        </button>
      </div>

      <PostForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={isSubmitting}
        submitButtonText="Update Post"
      />
    </div>
  );
}