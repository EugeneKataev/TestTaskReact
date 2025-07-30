'use client';

import React from 'react';
import { Comment } from '@/types';
import '../styles/CommentList.css';

interface CommentListProps {
  comments: Comment[];
  loading?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading = false }) => {
  if (loading) {
    return (
      <div className="commentListContainer">
        <div className="loadingState">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="commentListContainer">
        <div className="emptyState">
          <h4>No comments</h4>
          <p>Be the first to leave a comment!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="commentListContainer">
      <h4 className="commentsTitle">Comments ({comments.length})</h4>
      <div className="commentsList">
        {comments.map((comment) => (
          <div key={comment.id} className="commentItem">
            <div className="commentHeader">
              <span className="commentAuthor">{comment.author}</span>
              <span className="commentDate">
                {comment.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="commentText">
              {comment.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;