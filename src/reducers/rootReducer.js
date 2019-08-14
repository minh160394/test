import { combineReducers } from 'redux';
import { default as UserStore } from './userReducer';
import investmentReducer from './investmentReducer';
import transhistoryReducer from './transhistoryReducer';


const appReducer = combineReducers({
  UserStore,
  investment : investmentReducer,
  transhistory: transhistoryReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
