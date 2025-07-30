'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentSchema, CommentFormData } from '../lib/validations';
import { createComment } from '../store/commentsSlice';
import { RootState, AppDispatch } from '../lib/store';
import '../styles/CommentForm.css';

interface CommentFormProps {
    postId: string;
}

interface FormErrors {
    text?: string;
    author?: string;
    general?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.comments);

    const [formData, setFormData] = useState<CommentFormData>({
        text: '',
        author: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear field error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        try {
            CommentSchema.parse(formData);
            setErrors({});
            return true;
        } catch (error: unknown) {
            const newErrors: FormErrors = {};

            if (error && typeof error === 'object' && 'errors' in error) {
                const zodError = error as { errors: Array<{ path: string[]; message: string }> };
                zodError.errors.forEach((err) => {
                    const field = err.path[0] as keyof FormErrors;
                    newErrors[field] = err.message;
                });
            }

            setErrors(newErrors);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        if (validateForm()) {
            try {
                await dispatch(createComment(postId, formData));
                // Reset form after successful submission
                setFormData({
                    text: '',
                    author: ''
                });
                setErrors({});
            } catch {
                setErrors({
                    general: 'Failed to add comment. Please try again.'
                });
            }
        }
    };

    return (
        <div className="commentFormContainer">
            <h3 className="formTitle">Add a Comment</h3>

            <form onSubmit={handleSubmit} className="commentForm">
                {(errors.general || error) && (
                    <div className="errorMessage generalError">
                        {errors.general || error}
                    </div>
                )}

                <div className="formGroup">
                    <label htmlFor="author" className="formLabel">
                        Your Name *
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className={`formInput ${errors.author ? 'error' : ''}`}
                        placeholder="Enter your name"
                        disabled={loading}
                    />
                    {errors.author && (
                        <div className="errorMessage">
                            {errors.author}
                        </div>
                    )}
                </div>

                <div className="formGroup">
                    <label htmlFor="text" className="formLabel">
                        Comment *
                    </label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        className={`formTextarea ${errors.text ? 'error' : ''}`}
                        placeholder="Write your comment here..."
                        rows={4}
                        disabled={loading}
                    />
                    {errors.text && (
                        <div className="errorMessage">
                            {errors.text}
                        </div>
                    )}
                </div>

                <div className="formActions">
                    <button
                        type="submit"
                        className="submitButton"
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