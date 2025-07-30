# Blog App

## Description

Blog App is a simple blogging application built with React, Next.js, and Firebase. The application allows users to create, view, edit, and delete posts, as well as leave comments on them.

## Technologies

- **Frontend**: React 19, Next.js 15
- **State Management**: Redux
- **Database**: Firebase Firestore
- **Validation**: Zod
- **Type Safety**: TypeScript

## Features

- View list of posts
- Create new posts
- Edit existing posts
- Delete posts
- Add comments to posts
- View comments

## API

### Posts

#### Post Data Structure

```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Get List of Posts

```typescript
// Get all posts sorted by creation date (descending)
const q = query(postsCollection, orderBy('createdAt', 'desc'));
const querySnapshot = await getDocs(q);
```

#### Get Post by ID

```typescript
const docRef = doc(postsCollection, postId);
const docSnap = await getDoc(docRef);
```

#### Create Post

```typescript
const newPost: CreatePostDocument = {
  title: postData.title,
  content: postData.content,
  author: postData.author,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
};
const docRef = await addDoc(postsCollection, newPost);
```

#### Update Post

```typescript
const updateData: UpdatePostDocument = {
  title: postData.title,
  content: postData.content,
  author: postData.author,
  updatedAt: serverTimestamp()
};
const docRef = doc(postsCollection, postId);
await updateDoc(docRef, updateData);
```

#### Delete Post

```typescript
const docRef = doc(postsCollection, postId);
await deleteDoc(docRef);
```

### Comments

#### Comment Data Structure

```typescript
interface Comment {
  id: string;
  postId: string;
  text: string;
  author: string;
  createdAt: Date;
}
```

#### Get Comments for Post

```typescript
// Get comments without sorting in query (to avoid composite index)
const q = query(
  commentsCollection,
  where('postId', '==', postId)
);
const querySnapshot = await getDocs(q);

// Sort on client side
const comments = [];
querySnapshot.forEach((doc) => {
  comments.push(convertCommentFromFirestore(doc.id, doc.data()));
});
comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
```

#### Create Comment

```typescript
const newComment = {
  postId,
  text: commentData.text,
  author: commentData.author,
  createdAt: serverTimestamp()
};
const docRef = await addDoc(commentsCollection, newComment);
```

#### Delete Post Comments

```typescript
const q = query(commentsCollection, where('postId', '==', postId));
const querySnapshot = await getDocs(q);
querySnapshot.forEach(async (document) => {
  await deleteDoc(doc(commentsCollection, document.id));
});
```

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build project
npm run build

# Run built project
npm run start
```

## Data Validation

The application uses the Zod library for form data validation:

```typescript
// Post validation
const PostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  author: z.string().min(1, "Author name is required").max(100, "Author name is too long")
});

// Comment validation
const CommentSchema = z.object({
  text: z.string().min(1, "Comment text is required").max(500, "Comment is too long"),
  author: z.string().min(1, "Author name is required").max(100, "Author name is too long")
});
```