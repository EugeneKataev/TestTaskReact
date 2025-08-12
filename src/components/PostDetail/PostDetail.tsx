'use client';

import React, { useState } from 'react';
import { Post, Comment } from '../../types';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import {
  PostDetailContainer,
  PostDetail as StyledPostDetail,
  PostHeader,
  PostTitle,
  PostMeta,
  PostAuthor,
  PostDate,
  PostUpdated,
  PostActions,
  EditButton,
  DeleteButton,
  PostContent,
  ContentText,
  ContentParagraph,
  CommentsSection,
  CommentsTitle,
  NoComments,
  CommentsList,
  CommentItem,
  CommentHeader,
  CommentAuthor,
  CommentDate,
  CommentText,
  PrintHidden,
} from './PostDetail.styles';

interface PostDetailProps {
  post: Post;
  comments: Comment[];
  onEdit?: () => void;
  onDelete?: () => void;
  loading?: boolean;
  hasError?: boolean;
}

const PostDetail: React.FC<PostDetailProps> = ({
  post,
  comments,
  onEdit,
  onDelete,
  loading = false,
  hasError = false
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
    <PostDetailContainer>
      <StyledPostDetail $loading={loading}>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostMeta>
            <PostAuthor>By {post.author}</PostAuthor>
            <PostDate>
              Created: {formatDate(post.createdAt)}
            </PostDate>
            {post.updatedAt.getTime() !== post.createdAt.getTime() && (
              <PostUpdated>
                Updated: {formatDate(post.updatedAt)}
              </PostUpdated>
            )}
          </PostMeta>
        </PostHeader>

        {(onEdit || onDelete) && (
          <PrintHidden>
            <PostActions>
              {onEdit && (
                <EditButton
                  onClick={onEdit}
                  disabled={loading}
                >
                  Edit Post
                </EditButton>
              )}
              {onDelete && (
                <DeleteButton
                  onClick={handleDeleteClick}
                  disabled={loading}
                >
                  Delete Post
                </DeleteButton>
              )}
            </PostActions>
          </PrintHidden>
        )}

        <PostContent>
          <ContentText>
            {post.content.split('\n').map((paragraph, index) => (
              <ContentParagraph key={index}>
                {paragraph}
              </ContentParagraph>
            ))}
          </ContentText>
        </PostContent>

        <CommentsSection>
          <CommentsTitle>
            Comments ({comments.length})
          </CommentsTitle>
          
          {comments.length === 0 ? (
            <NoComments>
              <p>No comments yet</p>
            </NoComments>
          ) : (
            <CommentsList>
              {comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentHeader>
                    <CommentAuthor>{comment.author}</CommentAuthor>
                    <CommentDate>
                      {formatDate(comment.createdAt)}
                    </CommentDate>
                  </CommentHeader>
                  <CommentText>
                    {comment.text}
                  </CommentText>
                </CommentItem>
              ))}
            </CommentsList>
          )}
        </CommentsSection>
      </StyledPostDetail>

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
    </PostDetailContainer>
  );
};

export default PostDetail;