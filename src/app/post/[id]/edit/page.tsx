'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchPostById, updatePost, clearCurrentPost } from '@/store/postsSlice';
import PostForm from '@/components/PostForm';
import { PostFormData } from '@/types';
import '@/styles/EditPost.css';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postId = params.id as string;

  const { currentPost, loading, error } = useSelector((state: RootState) => state.posts);

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
      <div className="page-container">
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="page-container">
        <div className="error-state">
          <h2>Post Not Found</h2>
          <p>{error || 'The requested post could not be found.'}</p>
          <button onClick={() => router.push('/')} className="back-button">
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
    <div className="page-container">
      <div className="page-header">
        <h1>Edit Post</h1>
        <button onClick={() => router.back()} className="back-button">
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