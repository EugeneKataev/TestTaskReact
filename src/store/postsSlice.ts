import { Post, PostFormData, CreatePostDocument, UpdatePostDocument, PostDocument } from '@/types';
import { Dispatch } from 'redux';
import {
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { postsCollection, convertPostFromFirestore } from '@/lib/firebase';
import { deleteCommentsByPost } from './commentsSlice';

type ThunkDispatch = (action: unknown) => Promise<void>;

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST_BY_ID_REQUEST = 'FETCH_POST_BY_ID_REQUEST';
export const FETCH_POST_BY_ID_SUCCESS = 'FETCH_POST_BY_ID_SUCCESS';
export const FETCH_POST_BY_ID_FAILURE = 'FETCH_POST_BY_ID_FAILURE';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const CLEAR_POSTS_ERROR = 'CLEAR_POSTS_ERROR';
export const CLEAR_CURRENT_POST = 'CLEAR_CURRENT_POST';

export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts: Post[]) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error: string) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchPostByIdRequest = () => ({
  type: FETCH_POST_BY_ID_REQUEST,
});

export const fetchPostByIdSuccess = (post: Post) => ({
  type: FETCH_POST_BY_ID_SUCCESS,
  payload: post,
});

export const fetchPostByIdFailure = (error: string) => ({
  type: FETCH_POST_BY_ID_FAILURE,
  payload: error,
});

export const createPostRequest = () => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (post: Post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (error: string) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

export const updatePostRequest = () => ({
  type: UPDATE_POST_REQUEST,
});

export const updatePostSuccess = (post: Post) => ({
  type: UPDATE_POST_SUCCESS,
  payload: post,
});

export const updatePostFailure = (error: string) => ({
  type: UPDATE_POST_FAILURE,
  payload: error,
});

export const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST,
});

export const deletePostSuccess = (postId: string) => ({
  type: DELETE_POST_SUCCESS,
  payload: postId,
});

export const deletePostFailure = (error: string) => ({
  type: DELETE_POST_FAILURE,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_POSTS_ERROR,
});

export const clearCurrentPost = () => ({
  type: CLEAR_CURRENT_POST,
});


export const fetchPosts = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const q = query(postsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const posts: Post[] = [];

      querySnapshot.forEach((doc) => {
        const post = convertPostFromFirestore(doc.id, doc.data() as PostDocument);
        posts.push(post);
      });

      dispatch(fetchPostsSuccess(posts));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error loading posts';
      dispatch(fetchPostsFailure(errorMessage));
    }
  };
};

export const fetchPostById = (postId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPostByIdRequest());
    try {
      const postDoc = doc(postsCollection, postId);
      const docSnapshot = await getDoc(postDoc);

      if (docSnapshot.exists()) {
        const post = convertPostFromFirestore(docSnapshot.id, docSnapshot.data() as PostDocument);
        dispatch(fetchPostByIdSuccess(post));
      } else {
        dispatch(fetchPostByIdFailure('Post not found'));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error loading post';
      dispatch(fetchPostByIdFailure(errorMessage));
    }
  };
};

export const createPost = (postData: PostFormData) => {
  return async (dispatch: Dispatch) => {
    dispatch(createPostRequest());
    try {
      const newPostData: CreatePostDocument = {
        title: postData.title,
        content: postData.content,
        author: postData.author,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(postsCollection, newPostData);

      const createdDoc = await getDoc(docRef);
      if (createdDoc.exists()) {
        const post = convertPostFromFirestore(createdDoc.id, createdDoc.data() as PostDocument);
        dispatch(createPostSuccess(post));
      }
    } catch (error) {
      console.error('Error creating post:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error creating post';
      dispatch(createPostFailure(errorMessage));
    }
  };
};

export const updatePost = (postId: string, postData: PostFormData) => {
  return async (dispatch: Dispatch) => {
    dispatch(updatePostRequest());
    try {
      const postDoc = doc(postsCollection, postId);
      const updateData: UpdatePostDocument = {
        title: postData.title,
        content: postData.content,
        author: postData.author,
        updatedAt: serverTimestamp()
      };

      await updateDoc(postDoc, updateData as Partial<PostDocument>);

      const updatedDoc = await getDoc(postDoc);
      if (updatedDoc.exists()) {
        const post = convertPostFromFirestore(updatedDoc.id, updatedDoc.data() as PostDocument);
        dispatch(updatePostSuccess(post));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error updating post';
      dispatch(updatePostFailure(errorMessage));
    }
  };
};

export const deletePost = (postId: string) => {
  return async (dispatch: Dispatch & ThunkDispatch) => {
    dispatch(deletePostRequest());
    try {
      await dispatch(deleteCommentsByPost(postId));

      const postDoc = doc(postsCollection, postId);
      await deleteDoc(postDoc);

      dispatch(deletePostSuccess(postId));
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error deleting post';
      dispatch(deletePostFailure(errorMessage));
      return Promise.reject(error);
    }
  };
};

const postsReducer = (state = initialState, action: { type: string; payload?: unknown }) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload as Post[],
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    // Actions for fetching post by ID
    case FETCH_POST_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPost: action.payload as Post,
      };
    case FETCH_POST_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    case CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [action.payload as Post, ...state.posts],
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    case UPDATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_POST_SUCCESS:
      const updatedPost = action.payload as Post;
      return {
        ...state,
        loading: false,
        currentPost: updatedPost,
        posts: state.posts.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        ),
      };
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_POST_SUCCESS:
      const deletedPostId = action.payload as string;
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post.id !== deletedPostId),
        currentPost: state.currentPost?.id === deletedPostId ? null : state.currentPost,
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    case CLEAR_POSTS_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        currentPost: null,
      };

    default:
      return state;
  }
};

export default postsReducer;