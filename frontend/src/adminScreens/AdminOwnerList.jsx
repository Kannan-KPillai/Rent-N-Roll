import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const AdminOwnerList = () => {
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

  const [owners, setOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOwners, setFilteredOwners] = useState([]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    fetchOwners(selectedPage);
  };

  const fetchOwners = async (page) => {
    try {
      const response = await axios.get(
        `/api/admin/owner?page=${page}&search=${searchQuery}`
      );
      setOwners(response.data.owner);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  const toggleBlock = async (ownerId, isBlocked) => {
    try {
      const endpoint = isBlocked
        ? `/api/admin/unblockowner?ownerId=${ownerId}`
        : `/api/admin/blockowner?ownerId=${ownerId}`;

      const result = await Swal.fire({
        title: `Are you sure you want to ${
          isBlocked ? "unblock" : "block"
        } this owner?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        await axios.put(endpoint);

        setOwners((prevOwners) =>
          prevOwners.map((owner) =>
            owner._id === ownerId ? { ...owner, isBlocked: !isBlocked } : owner
          )
        );

        Swal.fire({
          title: "Success",
          text: `Owner ${isBlocked ? "unblocked" : "blocked"} successfully.`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error toggling owner block status:", error);

      Swal.fire({
        title: "Error",
        text: "An error occurred while toggling owner block status.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchOwners(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = owners.filter((owner) =>
      owner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOwners(filtered);
  }, [owners, searchQuery]);

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
            placeholder="Search by owner name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "200px", padding: "5px" }}
          />
        </div>
        <Card>
          <Card.Body>
            <h2 style={headerStyle}>Owners</h2>
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
                {filteredOwners.map((owner, index) => (
                  <tr key={owner._id}>
                    <td>{index + 1}</td>
                    <td>{owner.name}</td>
                    <td>{owner.email}</td>
                    <td>{owner.mobile}</td>
                    <td>
                      <button
                        style={{
                          width: "100px", // Fixed width
                          height: "30px", // Fixed height
                          backgroundColor: owner.isBlocked ? "green" : "red", // Red for blocked, green for unblocked
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleBlock(owner._id, owner.isBlocked)}
                      >
                        {owner.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div
          style={{
            bottom: "0",
            left: "0",
            width: "100%",
            textAlign: "center",
            backgroundColor: "white",
            borderTop: "1px solid #ccc",
            padding: "10px 0",
          }}
        >
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

export default AdminOwnerList;
