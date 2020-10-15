import React from "react";
import { connect } from "react-redux";
import * as commitAPI from "../api/CommitAPI";
import { Link } from "react-router-dom";

class RepoLinksContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    commitAPI.getRepositories();
  }

  render() {
    const { repositories } = this.props;

    if (!repositories || repositories.length === 0) {
      return <p style={{ marginLeft: 20 }}>Loading repositories...</p>;
    }

    return (
      <div>
        {repositories.map((repository, index) => {
          return (
            <li key={index}>
              <a href={`/home/${repository.name}`}>{repository.name}</a>
            </li>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  repositories: store.commitState.repositories,
});

export default connect(mapStateToProps)(RepoLinksContainer);
