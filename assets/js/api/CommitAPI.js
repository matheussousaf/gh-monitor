import axios from "axios";
import { reset } from "redux-form";
import store from "../store";
import {
  createRepositoryError,
  createRepositorySuccess,
  getCommitsSuccess,
  getRepositoriesSuccess,
} from "../actions/CommitActions";

import { getStatisticsSuccess } from "../actions/StatisticsActions";

const REPOSITORIES_URL = "/api/repositories/";
const STATISTICS_URL = "/api/statistics/";
const COMMITS_URL = "/api/commits/";

export const getCommits = (params) =>
  axios.get(COMMITS_URL, { params: { ...params } }).then((response) => {
    store.dispatch(getCommitsSuccess({ ...response.data }));
  });

export const getRepositories = () =>
  axios.get(REPOSITORIES_URL).then((response) => {
    store.dispatch(getRepositoriesSuccess(response.data));
  });

export const getStatistics = () =>
  axios.get(STATISTICS_URL).then((response) => {
    console.log(response.data)
    store.dispatch(getStatisticsSuccess(response.data));
  });

export const createRepository = (values, headers, formDispatch) =>
  axios
    .post(REPOSITORIES_URL, values, { headers })
    .then((response) => {
      store.dispatch(createRepositorySuccess(response.data, true));
      formDispatch(reset("repoCreate"));
    })
    .catch((error) => {
      const err = error.response;
      store.dispatch(createRepositoryError(err.data));
    });
