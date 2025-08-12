import { Timestamp, FieldValue } from 'firebase/firestore';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  text: string;
  author: string;
  createdAt: Date;
}

// Types for Firestore documents (without Date objects, using Timestamp)
export interface PostDocument {
  title: string;
  content: string;
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Types for creating documents in Firestore (with FieldValue for serverTimestamp)
export interface CreatePostDocument {
  title: string;
  content: string;
  author: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export interface UpdatePostDocument {
  title: string;
  content: string;
  author: string;
  updatedAt: FieldValue;
}

export interface CommentDocument {
  postId: string;
  text: string;
  author: string;
  createdAt: Timestamp;
}

// Import form types from Zod schemas for type safety
export type { PostFormData, CommentFormData } from '../lib/validations';
