import * as types from "../actions/ActionTypes";

const initialState = {
  statistics: [],
  totalRepositories: 0,
};

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATISTICS_SUCCESS:
      console.log("Payload", action.payload);

      return {
        ...state,
        totalRepositories: action.payload.length,
        statistics: action.payload,
      };
    default:
      return state;
  }
};

export default statisticReducer;
