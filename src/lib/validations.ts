import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  author: z.string().min(1, "Author name is required").max(100, "Author name is too long")
});

export const CommentSchema = z.object({
  text: z.string().min(1, "Comment text is required").max(500, "Comment is too long"),
  author: z.string().min(1, "Author name is required").max(100, "Author name is too long")
});

export type PostFormData = z.infer<typeof PostSchema>;
export type CommentFormData = z.infer<typeof CommentSchema>;
