'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchPostById, deletePost, clearCurrentPost } from '@/store/postsSlice';
import { fetchComments } from '@/store/commentsSlice';
import PostDetail from '@/components/PostDetail/PostDetail';
import CommentForm from '@/components/CommentForm/CommentForm';
import { PageContainer, LoadingState, ErrorState, BackButton, CommentsSection } from './PostPage.styles';

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const postId = params.id as string;

  const { currentPost, loading: postLoading, error: postError } = useAppSelector((state) => state.posts);
  const { comments } = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
      dispatch(fetchComments(postId));
    }

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, postId]);

  const handleEdit = () => {
    router.push(`/post/${postId}/edit`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deletePost(postId));
      setIsDeleted(true);
    } catch (error) {
      console.error('Error deleting post:', error);
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      router.replace('/');
    }
  }, [isDeleted, router]);

  if (isDeleted) {
    return (
      <PageContainer>
        <LoadingState>
          <p>Post deleted successfully. Redirecting...</p>
        </LoadingState>
      </PageContainer>
    );
  }

  if (postLoading) {
    return (
      <PageContainer>
        <LoadingState>
          <p>Loading...</p>
        </LoadingState>
      </PageContainer>
    );
  }

  if (postError || !currentPost) {
    return (
      <PageContainer>
        <ErrorState>
          <h2>Post Not Found</h2>
          <p>{postError || 'The requested post could not be found.'}</p>
          <BackButton onClick={() => router.push('/')}>
            Back to Home
          </BackButton>
        </ErrorState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PostDetail
        post={currentPost}
        comments={comments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={isDeleting}
      />

      <CommentsSection>
        <CommentForm postId={postId} />
      </CommentsSection>
    </PageContainer>
  );
}