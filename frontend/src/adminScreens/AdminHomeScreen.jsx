import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

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

  //For Getting the users listed in the admin page
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/admin"
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
      // Define the API endpoint based on the current user status
      const endpoint = isBlocked
        ? `/api/admin/unblockUser?userId=${userId}`   : `/api/admin/blockUser?userId=${userId}`;
      
      // Send a request to the backend to toggle the user's status
      await axios.put(endpoint);
      
      // Update the local state (users) to reflect the new user status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: !isBlocked } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user block status:', error);
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
                      <button onClick={() => toggleBlock(user._id, user.isBlocked)}>
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
