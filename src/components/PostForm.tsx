'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSchema, PostFormData } from '../lib/validations';
import { Post } from '../types';
import styles from './PostForm.module.scss';

interface PostFormProps {
    initialData?: Partial<Post>;
    onSubmit: (data: PostFormData) => void;
    loading?: boolean;
    submitButtonText?: string;
}

const PostForm: React.FC<PostFormProps> = ({
    initialData,
    onSubmit,
    loading = false,
    submitButtonText = 'Save Post'
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
        <div className={styles.postFormContainer}>
            <form onSubmit={handleSubmit(onFormSubmit)} className={styles.postForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.formLabel}>
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register('title')}
                        className={`${styles.formInput} ${errors.title ? 'error' : ''}`}
                        placeholder="Enter post title"
                        disabled={loading}
                    />
                    {errors.title && (
                        <div className={styles.errorMessage}>
                            {errors.title.message}
                        </div>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="author" className={styles.formLabel}>
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        {...register('author')}
                        className={`${styles.formInput} ${errors.author ? 'error' : ''}`}
                        placeholder="Enter author name"
                        disabled={loading}
                    />
                    {errors.author && (
                        <div className={styles.errorMessage}>
                            {errors.author.message}
                        </div>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="content" className={styles.formLabel}>
                        Content
                    </label>
                    <textarea
                        id="content"
                        {...register('content')}
                        className={`${styles.formTextarea} ${errors.content ? 'error' : ''}`}
                        placeholder="Enter post content (minimum 10 characters)"
                        rows={8}
                        disabled={loading}
                    />
                    {errors.content && (
                        <div className={styles.errorMessage}>
                            {errors.content.message}
                        </div>
                    )}
                </div>

                <div className={styles.formActions}>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : submitButtonText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;