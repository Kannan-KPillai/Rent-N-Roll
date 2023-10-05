import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Lottie from "lottie-react";
import data from "./data/data.json";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";

const customModalStyles = {
  content: {
    width: "400px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    background: "white",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortingOrder, setSortingOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // State to store the booking ID for review
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const fetchBookings = async (page = 1) => {
    try {
      const response = await axios.get(
        `/api/users/allBookings/${
          userInfo._id || userInfo.data._id
        }?page=${page}`,
        { withCredentials: true }
      );
      setBookings(response.data.bookings);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const sortBookings = (a, b) => {
    if (sortingOrder === "asc") {
      return new Date(a.dropoffDate) - new Date(b.dropoffDate);
    } else if (sortingOrder === "desc") {
      return new Date(b.dropoffDate) - new Date(a.dropoffDate);
    }
    return 0;
  };

  const handleCancelBooking = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once cancelled, you cannot undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/api/users/cancel/${bookingId}`)
          .then(() => {
            fetchBookings();
          })
          .catch((error) => {
            console.error("Error canceling booking:", error);
          });
      }
    });
  };

  const handleSubmit = async (bookingId) => {
    try {
      const payload = {
        userId: userInfo._id,
        carId: selectedBookingId,
        rating,
        review: reviewText,
      };

      await axios.post(`/api/users/ratings/${bookingId}`, payload);
      closeReviewModal();
      setRating(0);
      setReviewText("");  
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    fetchBookings(selectedPage);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isBookingCompleted = (dropoffDate) => {
    const formattedDropoffDate = new Date(dropoffDate);
    const currentDate = new Date();
    return currentDate > formattedDropoffDate;
  };

  const filteredBookings = bookings
    ? bookings.filter((booking) =>
        booking.carName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  filteredBookings.sort(sortBookings);

  // Function to open the review modal
  const openReviewModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsReviewModalOpen(true);
  };

  // Function to close the review modal
  const closeReviewModal = () => {
    setSelectedBookingId(null);
    setIsReviewModalOpen(false);
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="car-list" style={{ minHeight: "38rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "4rem",
          padding: "2rem",
        }}
      >
        <select
          style={{ width: "200px", padding: "5px" }}
          onChange={(e) => setSortingOrder(e.target.value)}
          value={sortingOrder}
        >
          <option value="asc">Sort by Date (Older)</option>
          <option value="desc">Sort by Date (Newest)</option>
        </select>
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "200px", padding: "5px" }}
        />
      </div>

      {filteredBookings.length === 0 ? (
        <div
          style={{
            height: "40rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lottie animationData={data} />
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              paddingBottom: "3rem",
            }}
          >
            <h1 style={{ fontFamily: "Mina, sans-serif", color: "black" }}>
              NO BOOKINGS YET
            </h1>
          </div>
        </div>
      ) : (
        <div className="car-header">
          <div className="car-type">Car Name</div>
          <div className="cars">Pickup Point</div>
          <div className="rent-day">Pickup Date</div>
          <div className="extra-rent">Dropoff Point</div>
          <div className="extra-rent">Dropoff Date</div>
          <div className="extra-rent">Total Amount</div>
          <div className="extra-rent">Advance Amount</div>
          <div className="extra-rent">Status</div>
          <div className="extra-rent">Actions</div>
        </div>
      )}
      {filteredBookings.map((booking) => (
        <div className="car-item" style={{ color: "white" }} key={booking._id}>
          <div className="car-type">{booking.carName}</div>
          <div className="cars">{booking.pickupPoint}</div>
          <div className="rent-day">{formatDate(booking.pickupDate)}</div>
          <div className="extra-rent">{booking.dropoffPoint}</div>
          <div className="extra-rent">{formatDate(booking.dropoffDate)}</div>
          <div className="extra-rent">{booking.totalPrice}</div>
          <div className="extra-rent">{booking.advanceAmount}</div>
          <div className="extra-rent">
            {isBookingCompleted(booking.dropoffDate) ? (
              <p style={{ color: "green" }}>Completed</p>
            ) : booking.cancelBooking ? (
              <p style={{ color: "red" }}>Cancelled</p>
            ) : (
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                }}
                onClick={() => handleCancelBooking(booking._id)}
                disabled={booking.cancelBooking}
              >
                Cancel
              </button>
            )}
          </div>
          <div className="extra-rent">
            {isBookingCompleted(booking.dropoffDate) &&
              !booking.completed && (
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  onClick={() => openReviewModal(booking._id)}
                >
                  Add Review
                </button>
              )}
          </div>
        </div>
      ))}
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

      {/* Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onRequestClose={closeReviewModal}
        style={customModalStyles}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Add Review
        </h2>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <StarRatings
            rating={rating}
            starRatedColor="#fddb3a"
            starHoverColor="#fddb3a"
            changeRating={handleRatingChange}
            numberOfStars={5}
            name="rating"
          />
        </div>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={handleReviewChange}
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingScreen;
