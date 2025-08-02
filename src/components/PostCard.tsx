'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import ConfirmDialog from './ConfirmDialog';
import styles from './PostCard.module.scss';

interface PostCardProps {
  post: Post;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => Promise<void> | void;
  loading?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete, loading = false }) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCardClick = () => {
    if (isDeleting || showDeleteDialog) return;
    router.push(`/post/${post.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(post.id);
    } else {
      router.push(`/post/${post.id}/edit`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteDialog(false);
    setIsDeleting(true);
    if (onDelete) {
      try {
        await onDelete(post.id);
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className={styles.postCard} onClick={handleCardClick}>
      <div className={styles.postCardContent}>
        <h2 className={styles.postCardTitle}>{post.title}</h2>
        <p className={styles.postCardExcerpt}>{getExcerpt(post.content)}</p>
        <div className={styles.postCardMeta}>
          <span className={styles.postCardAuthor}>By {post.author}</span>
          <div className={styles.postCardDate}>{formatDate(post.createdAt)}</div>
        </div>
      </div>
      <div className={styles.postCardActions}>
        <button 
          className={`${styles.postCardBtn} ${styles.postCardBtnEdit}`}
          onClick={handleEditClick}
          title="Edit post"
          disabled={loading}
        >
          Edit
        </button>
        <button 
          className={`${styles.postCardBtn} ${styles.postCardBtnDelete}`}
          onClick={handleDeleteClick}
          title="Delete post"
          disabled={loading}
        >
          Delete
        </button>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone and will also delete all comments associated with this post."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={loading || isDeleting}
      />
    </article>
  );
};

export default PostCard;