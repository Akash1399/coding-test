import React, { useEffect, useState } from "react";
import "./UserList.css";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import { UserCardOne, UserCardTwo } from "../components/UserCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header from "../components/Header";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchById, setSearchById] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery]);

  async function fetchUsers() {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=8&q=${searchQuery}`
    );
    setUsers(response.data);
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // New function to search by ID
  const handleSearchById = async () => {
    if (searchById.trim() !== "") {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${searchById}`
      );

      if (response.data) {
        setUsers([response.data]); // Update users with the found user
      } else {
        setUsers([]); // Clear the user list if no user is found
      }
    }
  };

  const handleIdChange = (event) => {
    setSearchById(event.target.value);
  };

  return (
    <div className="mainDiv">
      <input
        type="text"
        className="searchTextField"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <input
        type="text"
        className="searchTextField"
        placeholder="Search by ID..."
        value={searchById}
        onChange={handleIdChange}
      />
      <button className="searchButton" onClick={handleSearchById}>
        Search by ID
      </button>
      <Header />
      <Box className="userListBox">
        <h2>User card Lists</h2>
        <Grid container>
          {users.map((user) => {
            return (
              <Grid key={user.id} xs={12} sm={12} md={6} lg={6}>
                <Box className="userDetailBox">
                  <Box className="userDetailedBox">
                    <UserCardOne user={user} />
                  </Box>
                  <Box className="userDetailedBox">
                    <UserCardTwo user={user} />
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box className="paginationBox">
        <span className="paginateArrow" onClick={handlePrevPage}>
          <ArrowBackIosIcon color="white" style={{ color: "white" }} />
        </span>
        <span className="paginateArrow" onClick={handleNextPage}>
          <ArrowForwardIosIcon color="white" style={{ color: "white" }} />
        </span>
      </Box>
    </div>
  );
}

export default UserList;
