import { combineReducers } from '@reduxjs/toolkit';
import connectionReducer from './reducers/connection-slice';
import redisReducer from './reducers/redis-slice';
import settingsReducer from './reducers/settings-slice';

const rootReducer = combineReducers({
  connection: connectionReducer,
  redis: redisReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
