import React from "react";
import PropTypes from "prop-types";

const Navigator = ({ handleNextPage, handlePreviousPage, pageNumber }) => {
  return (
    <div>
      <ul className="pagination">
        <li onClick={handlePreviousPage} className="page-item">
          <a className="page-link">Previous</a>
        </li>
        <li>
          <a className="page-link">{pageNumber}</a>
        </li>
        <li onClick={handleNextPage} className="page-item">
          <a className="page-link">Next</a>
        </li>
      </ul>
    </div>
  );
};

Navigator.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

export default Navigator;
