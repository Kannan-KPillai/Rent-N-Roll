import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Swal from 'sweetalert2';



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
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "/api/admin/admin"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);


   // Function to toggle the block/unblock status of a user
   const toggleBlock = async (userId, isBlocked) => {
    try {
      const endpoint = isBlocked
        ? `/api/admin/unblockUser?userId=${userId}`
        : `/api/admin/blockUser?userId=${userId}`;
  
      // Display a SweetAlert confirmation dialog
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
  
        // Display a success SweetAlert message
        Swal.fire({
          title: 'Success',
          text: `User ${isBlocked ? 'unblocked' : 'blocked'} successfully.`,
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error toggling user block status:', error);
      // Display an error SweetAlert message
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while toggling user block status.',
        icon: 'error',
      });
    }
  };


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
              {users.map((user, index) => (
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
    </div>
  </div>
  );
};

export default AdminHomeScreen;
