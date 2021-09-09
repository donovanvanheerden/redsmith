import { combineReducers } from '@reduxjs/toolkit';
import redisReducer from './reducers/redis-slice';
import formReducer from './reducers/form-slice';

const rootReducer = combineReducers({
  redis: redisReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
