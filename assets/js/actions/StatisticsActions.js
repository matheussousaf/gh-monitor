import * as types from "./ActionTypes";

export const getStatisticsSuccess = (statistics) => ({
  type: types.GET_STATISTICS_SUCCESS,
  payload: statistics,
});
