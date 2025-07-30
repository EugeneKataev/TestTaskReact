'use client';

import React, { useState } from 'react';
import { Post, Comment } from '../types';
import ConfirmDialog from './ConfirmDialog';
import '../styles/PostDetail.css';

interface PostDetailProps {
  post: Post;
  comments: Comment[];
  onEdit?: () => void;
  onDelete?: () => void;
  loading?: boolean;
}

const PostDetail: React.FC<PostDetailProps> = ({
  post,
  comments,
  onEdit,
  onDelete,
  loading = false
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.();
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div className="post-detail-container">
      <article className="post-detail">
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-author">By {post.author}</span>
            <span className="post-date">
              Created: {formatDate(post.createdAt)}
            </span>
            {post.updatedAt.getTime() !== post.createdAt.getTime() && (
              <span className="post-updated">
                Updated: {formatDate(post.updatedAt)}
              </span>
            )}
          </div>
        </header>

        {(onEdit || onDelete) && (
          <div className="post-actions">
            {onEdit && (
              <button
                onClick={onEdit}
                className="action-button edit-button"
                disabled={loading}
              >
                Edit Post
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="action-button delete-button"
                disabled={loading}
              >
                Delete Post
              </button>
            )}
          </div>
        )}

        <div className="post-content">
          <div className="content-text">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="content-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <section className="comments-section">
          <h2 className="comments-title">
            Comments ({comments.length})
          </h2>
          
          {comments.length === 0 ? (
            <div className="no-comments">
              <p>No comments yet</p>
            </div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className="comment-text">
                    {comment.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone and will also delete all comments associated with this post."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={loading}
      />


    </div>
  );
};

export default PostDetail;