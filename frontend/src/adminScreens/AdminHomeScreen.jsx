import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

const AdminHomeScreen = () => {
  const headerStyle = {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  };
  const containerStyle = {
    paddingTop: "5rem",
    paddingLeft: "5rem",
    paddingRight: "5rem",
    width: "97%",
    backgroundColor: "rgba(53, 55, 67, 1)",
    paddingBottom: "3rem",
    overflowY: "scroll",
  };

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    fetchUsers(selectedPage); 
  };

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`/api/admin/admin?page=${page}&search=${searchQuery}`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleBlock = async (userId, isBlocked) => {
    try {
      const endpoint = isBlocked
        ? `/api/admin/unblockUser?userId=${userId}`
        : `/api/admin/blockUser?userId=${userId}`;
      const result = await Swal.fire({
        title: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });
  
      if (result.isConfirmed) {
        await axios.put(endpoint);
  
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: !isBlocked } : user
          )
        );
  
        Swal.fire({
          title: 'Success',
          text: `User ${isBlocked ? 'unblocked' : 'blocked'} successfully.`,
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error toggling user block status:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while toggling user block status.',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    fetchUsers(currentPage); // Initialize with the current page
  }, [currentPage]); // Run when currentPage changes

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchQuery]);

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "row",
      height: "100vh",
      width: "100vw",
    }}
  >
    <Sidebar />
    
    <div style={containerStyle}>
    <div>
    <input
          type="text"
          placeholder="Search by user name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "200px", padding: "5px" }}
        />
        </div>
      <Card>
        <Card.Body>
          <h2 style={headerStyle}>Users</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>
                    <button
                      style={{
                        width: "100px", // Fixed width
                        height: "30px", // Fixed height
                        backgroundColor: user.isBlocked ? "green"  : "red", // Red for blocked, green for unblocked
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleBlock(user._id, user.isBlocked)}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div style={{ bottom: "0", left: "0", width: "100%",
       textAlign: "center", backgroundColor: "white", borderTop: "1px solid #ccc", padding: "10px 0" }}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
      </div>
    </div>
  </div>
  );
};

export default AdminHomeScreen;
