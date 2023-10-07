import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import {
  BsPeopleFill,
  BsFillBookmarkFill,
  BsFillCarFrontFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    userCount: "Loading...",
    ownerCount: "Loading...",
    carCount: "Loading...",
    bookingCount: "Loading...",
  });
  const [monthlyBookings, setMonthlyBookings] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard");
        const { userCount, ownerCount, carCount, bookingCount } = response.data;

        setCounts({ userCount, ownerCount, carCount, bookingCount });
      } catch (error) {
        console.error("Error fetching datas:", error);
      }
    };

    fetchDetails();
  }, []);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('/api/admin/fetchBookings');
          setMonthlyBookings(response.data);
        } catch (error) {
          console.error('Error fetching monthly bookings:', error);
        }
      }

      fetchData();
    }, []);



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(53, 55, 67, 1)",
      }}
    >
      <Sidebar />
      <main className="main-container">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>
        <div className="main-cards">
          <div className="cardz">
            <div className="card-inner">
              <h3>Users</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>{counts.userCount}</h1>
          </div>

          <div className="cardz">
            <div className="card-inner">
              <h3>Owners</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>{counts.ownerCount}</h1>
          </div>

          <div className="cardz">
            <div className="card-inner">
              <h3>Cars</h3>
              <BsFillCarFrontFill className="card_icon" />
            </div>
            <h1>{counts.carCount}</h1>
          </div>

          <div className="cardz">
            <div className="card-inner">
              <h3>Bookings</h3>
              <BsFillBookmarkFill className="card_icon" />
            </div>
            <h1>{counts.bookingCount}</h1>
          </div>
        </div>
        <div className="charts">
          <ResponsiveContainer width="50%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={monthlyBookings}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
              dataKey="_id.month"
              tickFormatter={(month) => {
                const monthNames = [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ];
                return monthNames[month - 1];
              }}
            />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="50%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={monthlyBookings} 
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id.month"
              tickFormatter={(month) => {
                const monthNames = [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ];
                return monthNames[month - 1];
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" name="Bookings" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
