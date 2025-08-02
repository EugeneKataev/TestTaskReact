'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema, CommentFormData } from '../lib/validations';
import { createComment } from '../store/commentsSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import styles from './CommentForm.module.scss';

interface CommentFormProps {
    postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
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
            
        }
    };

    return (
        <div className={styles.commentFormContainer}>
            <h3 className={styles.formTitle}>Add a Comment</h3>

            <form onSubmit={handleSubmit(onFormSubmit)} className={styles.commentForm}>
                {error && (
                    <div className={`${styles.errorMessage} ${styles.generalError}`}>
                        {error}
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor="author" className={styles.formLabel}>
                        Your Name *
                    </label>
                    <input
                        type="text"
                        id="author"
                        {...register('author')}
                        className={`${styles.formInput} ${errors.author ? 'error' : ''}`}
                        placeholder="Enter your name"
                        disabled={loading}
                    />
                    {errors.author && (
                        <div className={styles.errorMessage}>
                            {errors.author.message}
                        </div>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="text" className={styles.formLabel}>
                        Comment *
                    </label>
                    <textarea
                        id="text"
                        {...register('text')}
                        className={`${styles.formTextarea} ${errors.text ? 'error' : ''}`}
                        placeholder="Write your comment here..."
                        rows={4}
                        disabled={loading}
                    />
                    {errors.text && (
                        <div className={styles.errorMessage}>
                            {errors.text.message}
                        </div>
                    )}
                </div>

                <div className={styles.formActions}>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Adding Comment...' : 'Add Comment'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;