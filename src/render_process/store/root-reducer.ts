import { combineReducers } from '@reduxjs/toolkit';
import redisReducer from './reducers/redis-slice';

const rootReducer = combineReducers({
  redis: redisReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
