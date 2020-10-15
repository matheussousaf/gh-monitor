import * as types from "./ActionTypes";
import * as commitAPI from "../api/CommitAPI";

export const createRepositorySuccess = (response, successMessage) => {
  commitAPI.getRepositories();
  return {
    type: types.CREATE_REPOSITORY_SUCCESS,
    payload: { response, successMessage },
  };
};

export const getCommitsSuccess = (commits) => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: commits,
});

export const createRepositoryError = (errorMessage) => ({
  type: types.CREATE_REPOSITORY_ERROR,
  payload: { errorMessage },
});

export const getRepositoriesSuccess = (repositories) => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: { repositories },
});

export const navigatePageBackward = () => ({
  type: types.NAVIGATE_PAGE_BACKWARD,
});

export const navigatePageForward = () => ({
  type: types.NAVIGATE_PAGE_FORWARD,
});

export const resetPageNumber = () => ({
  type: types.RESET_PAGE_NUMBER,
});
