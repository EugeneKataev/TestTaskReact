'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../../types';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import {
  PostCardContainer,
  PostCardContent,
  PostCardTitle,
  PostCardExcerpt,
  PostCardMeta,
  PostCardAuthor,
  PostCardDate,
  PostCardActions,
  EditButton,
  DeleteButton,
} from './PostCard.styles';

interface PostCardProps {
  post: Post;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => Promise<void> | void;
  loading?: boolean;
  hasError?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onEdit, 
  onDelete, 
  loading = false,
  hasError = false 
}) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCardClick = () => {
    if (isDeleting || showDeleteDialog || loading) return;
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
    <PostCardContainer 
      $loading={loading || isDeleting} 
      onClick={handleCardClick}
    >
      <PostCardContent>
        <PostCardTitle>{post.title}</PostCardTitle>
        <PostCardExcerpt>{getExcerpt(post.content)}</PostCardExcerpt>
        <PostCardMeta>
          <PostCardAuthor>By {post.author}</PostCardAuthor>
          <PostCardDate>{formatDate(post.createdAt)}</PostCardDate>
        </PostCardMeta>
      </PostCardContent>
      <PostCardActions>
        <EditButton 
          onClick={handleEditClick}
          title="Edit post"
          disabled={loading || isDeleting}
          $loading={loading || isDeleting}
        >
          Edit
        </EditButton>
        <DeleteButton 
          onClick={handleDeleteClick}
          title="Delete post"
          disabled={loading || isDeleting}
          $loading={loading || isDeleting}
        >
          Delete
        </DeleteButton>
      </PostCardActions>

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
    </PostCardContainer>
  );
};

export default PostCard;