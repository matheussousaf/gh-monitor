import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Reducers
import commitReducer from './CommitReducer';
import statisticsReducer from './StatisticsReducer';

// Combine Reducers
const reducers = combineReducers({
  form: formReducer,
  commitState: commitReducer,
  statisticsState: statisticsReducer,
});

export default reducers;
