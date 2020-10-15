import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as commitAPI from "../api/CommitAPI";
import CommitList from "../components/CommitList";
import Navigator from "../components/Navigator";
import { withRouter } from "react-router";

import {
  navigatePageBackward,
  navigatePageForward,
  resetPageNumber,
} from "../actions/CommitActions";

class CommitListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
    };
  }

  getCommits(author) {
    const { repo, pageNumber } = this.props;
    if (repo === "") {
      commitAPI.getCommits({ page: pageNumber });
      return;
    }
    commitAPI.getCommits({
      repository__name: repo,
      page: pageNumber,
      author: author,
    });
  }

  componentDidMount() {
    this.getCommits();
    let authors = [];
    console.log(this.props.commits)
    this.props.commits.map((author) => {
      if (!authors.includes(author)) {
        console.log(author)
        authors.push(author);
      }
    });
    this.setState({ authors: authors });
  }

  handleNextPage() {
    const { dispatch } = this.props;
    dispatch(navigatePageForward());
    this.getCommits();
  }

  handlePreviousPage() {
    const { dispatch } = this.props;
    dispatch(navigatePageBackward());
    this.getCommits();
  }

  render() {
    const { commits, pageNumber } = this.props;
    const { authors } = this.state;

    if (!commits || commits.length === 0) {
      return <div>Loading commits...</div>;
    }

    return (
      <div>
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            margin: "10px 0",
            padding: 0,
          }}
        >
          {authors.map((author, index) => {
            return (
              <li
                style={{
                  margin: 0,
                  marginRight: "20px",
                  padding: "5px 15px",
                  borderRadius: 50,
                  border: "1px solid gray",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => this.getCommits(author)}
              >
                {author}
              </li>
            );
          })}
        </ul>
        <CommitList commits={commits} />
        <Navigator
          handleNextPage={() => this.handleNextPage()}
          handlePreviousPage={() => this.handlePreviousPage()}
          pageNumber={pageNumber}
        />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  commits: store.commitState.commits,
  repositories: store.commitState.repositories,
  pageNumber: store.commitState.page,
});

export default connect(mapStateToProps)(withRouter(CommitListContainer));
