'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSchema, PostFormData } from '../../lib/validations';
import { Post } from '../../types';
import {
  PostFormContainer,
  PostForm as StyledPostForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  ErrorMessage,
  FormActions,
  SubmitButton,
} from './PostForm.styles';

interface PostFormProps {
  initialData?: Partial<Post>;
  onSubmit: (data: PostFormData) => void;
  loading?: boolean;
  submitButtonText?: string;
  hasError?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  submitButtonText = 'Save Post',
  hasError = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      author: initialData?.author || ''
    }
  });

  const onFormSubmit = (data: PostFormData) => {
    if (!loading) {
      onSubmit(data);
    }
  };

  return (
    <PostFormContainer>
      <StyledPostForm onSubmit={handleSubmit(onFormSubmit)} $loading={loading}>
        <FormGroup>
          <FormLabel htmlFor="title">
            Title
          </FormLabel>
          <FormInput
            type="text"
            id="title"
            {...register('title')}
            $hasError={!!errors.title}
            placeholder="Enter post title"
            disabled={loading}
          />
          {errors.title && (
            <ErrorMessage>
              {errors.title.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="author">
            Author
          </FormLabel>
          <FormInput
            type="text"
            id="author"
            {...register('author')}
            $hasError={!!errors.author}
            placeholder="Enter author name"
            disabled={loading}
          />
          {errors.author && (
            <ErrorMessage>
              {errors.author.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="content">
            Content
          </FormLabel>
          <FormTextarea
            id="content"
            {...register('content')}
            $hasError={!!errors.content}
            placeholder="Enter post content (minimum 10 characters)"
            rows={8}
            disabled={loading}
          />
          {errors.content && (
            <ErrorMessage>
              {errors.content.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormActions>
          <SubmitButton
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : submitButtonText}
          </SubmitButton>
        </FormActions>
      </StyledPostForm>
    </PostFormContainer>
  );
};

export default PostForm;