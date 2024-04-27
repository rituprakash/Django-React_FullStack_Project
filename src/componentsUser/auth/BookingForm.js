
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../../components/auth/checkAuth";
import Navbar from "../userNavbar";
import { v4 as uuidv4 } from 'uuid';

function BookingForm() {
  const { movieId: movieIdFromUrl } = useParams();
  const [movieId, setMovieId] = useState();
  const [movieTitle, setMovieTitle] = useState();
  const [noOfSeats, setNoOfSeats] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(150);
  const [ticketPrice] = useState(150);
  const [backendBookingId , setBookingId] = useState(); // State to hold booking ID

  const [minDate, setMinDate] = useState(""); // State to hold minimum selectable date
  const [maxDate, setMaxDate] = useState(""); // State to hold maximum selectable date
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [time3, setTime3] = useState("");
  const [time4, setTime4] = useState("");

  // useEffect(() => {
  //   // const today = new Date();
  //   // const nextSevenDays = new Date(today);
  //   // nextSevenDays.setDate(today.getDate() + 7); // Get the date 7 days from today
  //   // setMinDate(today.toISOString().split('T')[0]);
  //   // setMaxDate(nextSevenDays.toISOString().split('T')[0]);


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/userAccount/view_movie/${movieIdFromUrl}`)
      .then((response) => {
        const fetchedMovie = response.data;
        console.log(response.data);
        setMovieId(fetchedMovie.id);
        setMovieTitle(fetchedMovie.title);
        setTime1(fetchedMovie.time1);
        setTime2(fetchedMovie.time2);
        setTime3(fetchedMovie.time3);
        setTime4(fetchedMovie.time4);
  
        // Extract start and end dates from movie data
        const { startDate, endDate } = response.data;
  
        // Set minDate and maxDate based on start and end dates
        const today = new Date();
        const movieStartDate = new Date(startDate);
        const movieEndDate = new Date(endDate);
  
        if (movieStartDate > today) {
          // If startDate is in the future, set minDate to startDate
          setMinDate(movieStartDate.toISOString().split('T')[0]);
        } else {
          // If startDate is today or in the past, set minDate to today
          setMinDate(today.toISOString().split('T')[0]);
        }
        // Set maxDate to endDate
        setMaxDate(movieEndDate.toISOString().split('T')[0]);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieIdFromUrl]);
  

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
  };

  const handleSeatChange = (event) => {
    const numberOfSeats = parseInt(event.target.value);
    const newTotalPrice = numberOfSeats * ticketPrice;
    setNoOfSeats(numberOfSeats);
    setTotalPrice(newTotalPrice);
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedTime(selectedTime);
  };

  const user = useSelector((store) => store.auth.user);
  const token = user?.token;
  const userId = user ? user.userId : null;
  const email = user ? user.email : null; // Retrieve email from user object
  console.log(user)

  function addBooking() {
    if (!movieId) {
        console.error("Movie ID is null or empty.");
        return;
    }

    // Generate a unique booking ID using UUID
    //const localBookingId = uuidv4();

    axios
        .post(
            "http://127.0.0.1:8000/userAccount/movie_Booking/",
            {
                user: userId,
                title: movieId,
                date: date,
                time: selectedTime,
                no_of_seats: noOfSeats,
                ticket_price: ticketPrice,
                total_price: totalPrice,
                film_name: movieTitle
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        )
        .then((response) => {
           console.log(response.data)

           const backendBookingId = response.data.booking_id; // Save backend booking ID
           setBookingId(backendBookingId); // Set booking ID to state



        handlePayment(backendBookingId);
        })
        .catch((error) => {
            console.error("Error in movie booking:", error);
        });
  }

  const handlePayment = (backendBookingId) => {
    axios
      .post("http://127.0.0.1:8000/userAccount/generate_order/", {
        amount: totalPrice,
        order_id: backendBookingId,
      })
      .then((response) => {
        const orderId = response.data.order_id;


        const options = {
          key: "rzp_test_6TYuHFJTCqolOm",
          amount: totalPrice,
          currency: "INR",
          order_id: orderId,
          name: "YOUR COMPANY NAME",
          description: "Payment for Movie Ticket",
          handler: function (response) {
            console.log("Payment successful:", response);
            sendEmail(); // Call sendEmail function after payment success

            navigate(`/ConfirmationPage/${userId}/${encodeURIComponent(movieTitle)}/${backendBookingId}`); // Include movieTitle, booking_id in the URL parameters
            
            
          },
          prefill: {
            name: "John Doe",
            email: email, // Use the retrieved email here
            contact: "9999999999",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch((error) => {
        console.error("Error initiating payment:", error);
      });
  };

  const sendEmail = () => {
    const emailData = {
        recipient_email: email, 
        subject: 'Movie Ticket Booking Confirmation',
        message: 'Thank you for choosing to experience this cinematic journey with us. Your ticket(s) are now confirmed, and we look forward to welcoming you to the theater. Enjoy the show....!!'
    };

    axios.post('http://127.0.0.1:8000/userAccount/send_email', emailData)
        .then(response => {
            console.log('Email sent successfully');
        })
        .catch(error => {
            console.error('Failed to send email:', error);
        });
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center mt-5 mb-5">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card">
            <div className="card-header">{movieTitle}</div>
            <div className="card-body">
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={handleDateChange}
                  min={minDate}
                  max={maxDate}
                />
              </div>

              <div className="form-group">
                <label>Show Time:</label>
                <select
                    className="form-control"
                    value={selectedTime}
                    onChange={handleTimeChange}
                  >
                    <option value="">Select a time</option>
                    {time1 !== "00:00" && <option value={time1}>{time1}</option>}
                    {time2 !== "00:00" && <option value={time2}>{time2}</option>}
                    {time3 !== "00:00" && <option value={time3}>{time3}</option>}
                    {time4 !== "00:00" && <option value={time4}>{time4}</option>}
                </select>

              </div>
              <div className="form-group">
                <label>Number of Seats:</label>
                <input
                  type="number"
                  className="form-control"
                  value={noOfSeats}
                  onChange={handleSeatChange}
                />
              </div>
              <div className="form-group">
                <label>Total Price:</label>
                <input
                  type="text"
                  className="form-control"
                  value={totalPrice}
                  readOnly
                />
              </div>
              <div className="form-group text-center">
                <button
                  className="btn btn-danger"
                  onClick={addBooking}
                >
                  Book Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(BookingForm);