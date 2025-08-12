'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema, CommentFormData } from '../../lib/validations';
import { createComment } from '../../store/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  CommentFormContainer,
  FormTitle,
  CommentForm as StyledCommentForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  ErrorMessage,
  GeneralError,
  FormActions,
  SubmitButton,
} from './CommentForm.styles';

interface CommentFormProps {
  postId: string;
  hasError?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, hasError = false }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.comments);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CommentFormData>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      text: '',
      author: ''
    }
  });

  const onFormSubmit = async (data: CommentFormData) => {
    if (loading) return;

    try {
      await dispatch(createComment(postId, data));
      reset();
    } catch {
      // Error handling is done in Redux
    }
  };

  return (
    <CommentFormContainer>
      <FormTitle>Add a Comment</FormTitle>

      <StyledCommentForm onSubmit={handleSubmit(onFormSubmit)} $loading={loading}>
        {error && (
          <GeneralError>
            {error}
          </GeneralError>
        )}

        <FormGroup>
          <FormLabel htmlFor="author">
            Your Name *
          </FormLabel>
          <FormInput
            type="text"
            id="author"
            {...register('author')}
            $hasError={!!errors.author}
            placeholder="Enter your name"
            disabled={loading}
          />
          {errors.author && (
            <ErrorMessage>
              {errors.author.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="text">
            Comment *
          </FormLabel>
          <FormTextarea
            id="text"
            {...register('text')}
            $hasError={!!errors.text}
            placeholder="Write your comment here..."
            rows={4}
            disabled={loading}
          />
          {errors.text && (
            <ErrorMessage>
              {errors.text.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormActions>
          <SubmitButton
            type="submit"
            disabled={loading}
          >
            {loading ? 'Adding Comment...' : 'Add Comment'}
          </SubmitButton>
        </FormActions>
      </StyledCommentForm>
    </CommentFormContainer>
  );
};

export default CommentForm;