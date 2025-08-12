'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchPostById, updatePost, clearCurrentPost } from '@/store/postsSlice';
import PostForm from '@/components/PostForm/PostForm';
import { PostFormData } from '@/types';
import { PageContainer, LoadingState, ErrorState, BackButton, PageHeader, HeaderBackButton } from './EditPost.styles';

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
      <PageContainer>
        <LoadingState>
          <p>Loading...</p>
        </LoadingState>
      </PageContainer>
    );
  }

  if (error || !currentPost) {
    return (
      <PageContainer>
        <ErrorState>
          <h2>Post Not Found</h2>
          <p>{error || 'The requested post could not be found.'}</p>
          <BackButton onClick={() => router.push('/')}>
            Back to Home
          </BackButton>
        </ErrorState>
      </PageContainer>
    );
  }

  const initialData = {
    title: currentPost.title,
    content: currentPost.content,
    author: currentPost.author
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Edit Post</h1>
        <HeaderBackButton onClick={() => router.back()}>
          ← Back
        </HeaderBackButton>
      </PageHeader>

      <PostForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={isSubmitting}
        submitButtonText="Update Post"
      />
    </PageContainer>
  );
}