import { Comment, CommentFormData, CommentDocument } from '@/types';
import {
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db, commentsCollection, convertCommentFromFirestore } from '@/lib/firebase';
import { Dispatch } from 'redux';

// type
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';
export const DELETE_COMMENTS_BY_POST_REQUEST = 'DELETE_COMMENTS_BY_POST_REQUEST';
export const DELETE_COMMENTS_BY_POST_SUCCESS = 'DELETE_COMMENTS_BY_POST_SUCCESS';
export const DELETE_COMMENTS_BY_POST_FAILURE = 'DELETE_COMMENTS_BY_POST_FAILURE';
export const CLEAR_COMMENTS_ERROR = 'CLEAR_COMMENTS_ERROR';

// Status interface
export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

// Action creators
export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const fetchCommentsSuccess = (comments: Comment[]) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchCommentsFailure = (error: string) => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: error,
});

export const createCommentRequest = () => ({
  type: CREATE_COMMENT_REQUEST,
});

export const createCommentSuccess = (comment: Comment) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: comment,
});

export const createCommentFailure = (error: string) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: error,
});

export const deleteCommentsByPostRequest = () => ({
  type: DELETE_COMMENTS_BY_POST_REQUEST,
});

export const deleteCommentsByPostSuccess = (postId: string) => ({
  type: DELETE_COMMENTS_BY_POST_SUCCESS,
  payload: postId,
});

export const deleteCommentsByPostFailure = (error: string) => ({
  type: DELETE_COMMENTS_BY_POST_FAILURE,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_COMMENTS_ERROR,
});

export const fetchComments = (postId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchCommentsRequest());

    try {
      const q = query(
        commentsCollection,
        where('postId', '==', postId)
      );

      const querySnapshot = await getDocs(q);
      const comments: Comment[] = [];

      querySnapshot.forEach((doc) => {
        const comment = convertCommentFromFirestore(doc.id, doc.data() as CommentDocument);
        comments.push(comment);
      });

      comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      dispatch(fetchCommentsSuccess(comments));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error loading comments';
      dispatch(fetchCommentsFailure(errorMessage));
    }
  };
};

// Async thunk for create comment
export const createComment = (postId: string, commentData: CommentFormData) => {
  return async (dispatch: Dispatch) => {
    dispatch(createCommentRequest());
    
    try {
      const docRef = await addDoc(commentsCollection, {
        postId,
        text: commentData.text,
        author: commentData.author,
        createdAt: serverTimestamp()
      });
      
      // Create an object of commentary for adding to Store
      const newComment: Comment = {
        id: docRef.id,
        postId,
        text: commentData.text,
        author: commentData.author,
        createdAt: new Date()
      };
      
      dispatch(createCommentSuccess(newComment));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error creating comment';
      dispatch(createCommentFailure(errorMessage));
    }
  };
};

// Async thunk for delete all comment for post
export const deleteCommentsByPost = (postId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteCommentsByPostRequest());
    
    try {
      const q = query(
        commentsCollection,
        where('postId', '==', postId)
      );
      
      const querySnapshot = await getDocs(q);
      
      // delete all the comments of the post
      const deletePromises = querySnapshot.docs.map(commentDoc => 
        deleteDoc(doc(db, 'comments', commentDoc.id))
      );
      
      await Promise.all(deletePromises);
      
      dispatch(deleteCommentsByPostSuccess(postId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error deleting comments';
      dispatch(deleteCommentsByPostFailure(errorMessage));
    }
  };
};

// Reducer
const commentsReducer = (state = initialState, action: { type: string; payload?: unknown }) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload as Comment[],
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload as Comment],
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    case DELETE_COMMENTS_BY_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_COMMENTS_BY_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.filter(comment => comment.postId !== action.payload as string),
      };
    case DELETE_COMMENTS_BY_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    case CLEAR_COMMENTS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default commentsReducer;