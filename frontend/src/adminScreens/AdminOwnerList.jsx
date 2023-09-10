import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";


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
      };

      const [owners, setOwners] = useState([])

      useEffect(() => {
        const fetchOwners = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5000/api/admin/owner"
            );
            setOwners(response.data.owner);
          } catch (error) {
            console.error("Error fetching owners:", error);
          }
        };
        fetchOwners();
      }, []);

      const toggleBlock = async (ownerId, isBlocked) => {
        try {
          // Define the API endpoint based on the current owner status
          const endpoint = isBlocked
            ? `/api/admin/unblockowner?ownerId=${ownerId}`
            : `/api/admin/blockowner?ownerId=${ownerId}`;
      
          // Send a request to the backend to toggle the owner's status
          await axios.put(endpoint);
      
          // Update the local state to reflect the new owner status
          setOwners((prevOwners) =>
            prevOwners.map((owner) =>
              owner._id === ownerId ? { ...owner, isBlocked: !isBlocked } : owner
            )
          );
        } catch (error) {
          console.error('Error toggling owner block status:', error);
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
              {owners.map((owner, index) => (
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
                        backgroundColor: owner.isBlocked ? "green"  : "red", // Red for blocked, green for unblocked
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
    </div>
  </div>
  )
}

export default AdminOwnerList
