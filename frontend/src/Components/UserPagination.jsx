import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";

const UserPagination = ({ users, usersPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
    />
  );
};

export default UserPagination;