import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, collection } from 'firebase/firestore';
import { Post, Comment, PostDocument, CommentDocument } from '@/types';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Connect to emulator in development mode (optional)
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch {
    console.log('Firestore emulator already connected');
  }
}

// Typed collections
export const postsCollection = collection(db, 'posts');
export const commentsCollection = collection(db, 'comments');

// Data conversion utilities
export const convertPostFromFirestore = (id: string, data: PostDocument): Post => ({
  id,
  title: data.title,
  content: data.content,
  author: data.author,
  createdAt: data.createdAt.toDate(),
  updatedAt: data.updatedAt.toDate()
});

export const convertCommentFromFirestore = (id: string, data: CommentDocument): Comment => ({
  id,
  postId: data.postId,
  text: data.text,
  author: data.author,
  createdAt: data.createdAt.toDate()
});

export { db };
export default app;
