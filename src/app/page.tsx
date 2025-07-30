import { getDocs, query, orderBy } from 'firebase/firestore';
import { postsCollection, convertPostFromFirestore } from '@/lib/firebase';
import { Post, PostDocument } from '@/types';
import PostList from '@/components/PostList';
import Link from 'next/link';
import '@/styles/HomePage.css';

// Server function for loading posts
async function getPosts(): Promise<Post[]> {
  try {
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];

    querySnapshot.forEach((doc) => {
      const post = convertPostFromFirestore(doc.id, doc.data() as PostDocument);
      posts.push(post);
    });

    return posts;
  } catch (error) {
    console.error('Error loading posts on server:', error);
    return [];
  }
}

export default async function Home() {
  // Loading posts on the server
  const posts = await getPosts();

  return (
    <div className="homePage">
      <div className="homeHeader">
        <h1>Blog App</h1>
        <p>Welcome! Read interesting posts and share your thoughts.</p>
        <Link href="/post/create" className="createPostButton">
          Create Post
        </Link>
      </div>

      <PostList posts={posts} loading={false} />
    </div>
  );
}
