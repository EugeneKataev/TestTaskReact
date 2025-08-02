'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchPostById, deletePost, clearCurrentPost } from '@/store/postsSlice';
import { fetchComments } from '@/store/commentsSlice';
import PostDetail from '@/components/PostDetail';
import CommentForm from '@/components/CommentForm';
import styles from './PostPage.module.scss';

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
      <div className={styles.pageContainer}>
        <div className={styles.loadingState}>
          <p>Post deleted successfully. Redirecting...</p>
        </div>
      </div>
    );
  }

  if (postLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingState}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (postError || !currentPost) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorState}>
          <h2>Post Not Found</h2>
          <p>{postError || 'The requested post could not be found.'}</p>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <PostDetail
        post={currentPost}
        comments={comments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={isDeleting}
      />

      <div className={styles.commentsSection}>
        <CommentForm postId={postId} />
      </div>
    </div>
  );
}