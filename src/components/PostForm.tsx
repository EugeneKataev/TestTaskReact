'use client';

import React, { useState } from 'react';
import { PostSchema, PostFormData } from '../lib/validations';
import { Post } from '../types';
import '../styles/PostForm.css';

interface PostFormProps {
    initialData?: Partial<Post>;
    onSubmit: (data: PostFormData) => void;
    loading?: boolean;
    submitButtonText?: string;
}

interface FormErrors {
    title?: string;
    content?: string;
    author?: string;
    general?: string;
}

const PostForm: React.FC<PostFormProps> = ({
    initialData,
    onSubmit,
    loading = false,
    submitButtonText = 'Save Post'
}) => {
    const [formData, setFormData] = useState<PostFormData>({
        title: initialData?.title || '',
        content: initialData?.content || '',
        author: initialData?.author || ''
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

        // Clear error for the field when it changes
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        try {
            PostSchema.parse(formData);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="postFormContainer">
            <form onSubmit={handleSubmit} className="postForm">
                {errors.general && (
                    <div className="errorMessage generalError">
                        {errors.general}
                    </div>
                )}

                <div className="formGroup">
                    <label htmlFor="title" className="formLabel">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`formInput ${errors.title ? 'error' : ''}`}
                        placeholder="Enter post title"
                        disabled={loading}
                    />
                    {errors.title && (
                        <div className="errorMessage">
                            {errors.title}
                        </div>
                    )}
                </div>

                <div className="formGroup">
                    <label htmlFor="author" className="formLabel">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className={`formInput ${errors.author ? 'error' : ''}`}
                        placeholder="Enter author name"
                        disabled={loading}
                    />
                    {errors.author && (
                        <div className="errorMessage">
                            {errors.author}
                        </div>
                    )}
                </div>

                <div className="formGroup">
                    <label htmlFor="content" className="formLabel">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        className={`formTextarea ${errors.content ? 'error' : ''}`}
                        placeholder="Enter post content (minimum 10 characters)"
                        rows={8}
                        disabled={loading}
                    />
                    {errors.content && (
                        <div className="errorMessage">
                            {errors.content}
                        </div>
                    )}
                </div>

                <div className="formActions">
                    <button
                        type="submit"
                        className="submitButton"
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