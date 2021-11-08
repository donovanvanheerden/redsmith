import { combineReducers } from '@reduxjs/toolkit';
import connectionReducer from './reducers/connection-slice';
import redisReducer from './reducers/redis-slice';
import formReducer from './reducers/form-slice';

const rootReducer = combineReducers({
  connection: connectionReducer,
  redis: redisReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
