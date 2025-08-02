'use client';

import React, { useState } from 'react';
import { Post, Comment } from '../types';
import ConfirmDialog from './ConfirmDialog';
import styles from './PostDetail.module.scss';

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
    <div className={styles.postDetailContainer}>
      <article className={styles.postDetail}>
        <header className={styles.postHeader}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <div className={styles.postMeta}>
            <span className={styles.postAuthor}>By {post.author}</span>
            <span className={styles.postDate}>
              Created: {formatDate(post.createdAt)}
            </span>
            {post.updatedAt.getTime() !== post.createdAt.getTime() && (
              <span className={styles.postUpdated}>
                Updated: {formatDate(post.updatedAt)}
              </span>
            )}
          </div>
        </header>

        {(onEdit || onDelete) && (
          <div className={styles.postActions}>
            {onEdit && (
              <button
                onClick={onEdit}
                className={`${styles.actionButton} ${styles.editButton}`}
                disabled={loading}
              >
                Edit Post
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                disabled={loading}
              >
                Delete Post
              </button>
            )}
          </div>
        )}

        <div className={styles.postContent}>
          <div className={styles.contentText}>
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className={styles.contentParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>
            Comments ({comments.length})
          </h2>
          
          {comments.length === 0 ? (
            <div className={styles.noComments}>
              <p>No comments yet</p>
            </div>
          ) : (
            <div className={styles.commentsList}>
              {comments.map((comment) => (
                <div key={comment.id} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor}>{comment.author}</span>
                    <span className={styles.commentDate}>
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className={styles.commentText}>
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