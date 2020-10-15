import React from "react";
import { connect } from "react-redux";
import * as commitAPI from "../api/CommitAPI";

class StatisticsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    commitAPI.getStatistics();
  }

  render() {
    const { statistics, totalRepositories } = this.props;

    return (
      <div>
        <h2>Statistics</h2>
        <div>Total repositories: {totalRepositories}</div>
        <ul>
          {statistics.map((repository, index) => {
            return (
              <li key={index}>
                <p>{repository.name}:</p>
                <p>Total commits: {repository.num_commits}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  statistics: store.statisticsState.statistics,
  totalRepositories: store.statisticsState.totalRepositories,
});

export default connect(mapStateToProps)(StatisticsContainer);
