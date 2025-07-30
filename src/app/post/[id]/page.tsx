'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchPostById, deletePost, clearCurrentPost } from '@/store/postsSlice';
import { fetchComments } from '@/store/commentsSlice';
import PostDetail from '@/components/PostDetail';
import CommentForm from '@/components/CommentForm';
import '@/styles/PostPage.css';

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const postId = params.id as string;

  const { currentPost, loading: postLoading, error: postError } = useSelector((state: RootState) => state.posts);
  const { comments } = useSelector((state: RootState) => state.comments);

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

  // Редирект после успешного удаления
  useEffect(() => {
    if (isDeleted) {
      router.replace('/');
    }
  }, [isDeleted, router]);

  if (isDeleted) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <p>Post deleted successfully. Redirecting...</p>
        </div>
      </div>
    );
  }

  if (postLoading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (postError || !currentPost) {
    return (
      <div className="page-container">
        <div className="error-state">
          <h2>Post Not Found</h2>
          <p>{postError || 'The requested post could not be found.'}</p>
          <button onClick={() => router.push('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <PostDetail
        post={currentPost}
        comments={comments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={isDeleting}
      />
      
      <div className="comments-section">
        <CommentForm postId={postId} />
      </div>
    </div>
  );
}