import * as types from "../actions/ActionTypes";

const initialState = {
  commits: [],
  repositories: [],
  successMessage: false,
  errorMessage: "",
  page: 1,
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload),
      };
    case types.CREATE_REPOSITORY_SUCCESS: {
      return { ...state, successMessage: action.payload.successMessage };
    }
    case types.CREATE_REPOSITORY_ERROR: {
      return { ...state, errorMessage: action.payload.errorMessage };
    }
    case types.GET_REPOSITORIES_SUCCESS: {
      return { ...state, repositories: action.payload.repositories };
    }
    case types.NAVIGATE_PAGE_FORWARD: {
      return { ...state, page: state.page + 1 };
    }
    case types.NAVIGATE_PAGE_BACKWARD: {
      return { ...state, page: state.page > 1 ? state.page - 1 : state.page };
    }
    case types.RESET_PAGE_NUMBER: {
      return { ...state, page: 0 };
    }
    default:
      return state;
  }
};

export default commitReducer;
