import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, collection } from 'firebase/firestore';
import { Post, Comment, PostDocument, CommentDocument } from '@/types';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAOwcRmpVc4QVgAZO7ulArmdFHz6J_4WpU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "testblogapp-71500.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "testblogapp-71500",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "testblogapp-71500.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "574425098737",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:574425098737:web:ac3e698910c8b2ad43bc50"
};

// Validate Firebase configuration
const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingConfigKeys = requiredConfigKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

if (missingConfigKeys.length > 0) {
  console.error('Missing Firebase configuration keys:', missingConfigKeys);
  console.error('Current config:', firebaseConfig);
} else {
  console.log('Firebase configuration loaded successfully');
}

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
