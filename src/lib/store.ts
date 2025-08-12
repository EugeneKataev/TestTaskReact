import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import postsReducer, { PostsState } from '../store/postsSlice';
import commentsReducer, { CommentsState } from '../store/commentsSlice';

export interface RootState {
  posts: PostsState;
  comments: CommentsState;
}

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
