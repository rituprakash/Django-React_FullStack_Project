

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import checkAuth from "../../components/auth/checkAuth";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import Navbar from "../userNavbar";

function BookingHistory() {
  const { postId } = useParams();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const token = user?.token;
  const userId = user ? user.userId : null;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/userAccount/booking_history/${userId}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setBookingHistory(response.data);
        setDataFetched(true);
      })
      .catch((error) => {
        console.error("Error fetching booking history:", error);
      });
  }, [userId]);

  const downloadPdf = (containerId) => {
    const ticketDetails = document.getElementById(containerId);
    if (!ticketDetails) {
      console.error("Ticket details not found.");
      return;
    }

    html2canvas(ticketDetails)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);

        // Include QR code in PDF
        const qrCanvas = document.querySelector("canvas"); 
        if (qrCanvas) {
          const qrImgData = qrCanvas.toDataURL("image/png");
          pdf.addPage();
          pdf.addImage(qrImgData, "PNG", 3, 3, 5, 5,null, "SLOW");
        }

        pdf.save("ticket.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div>
    <Navbar/>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center text-white mt-3 mb-5">Booking History</h1>
            {dataFetched ? (
              bookingHistory.map((booking) => (
                <div key={booking.booking_id} className="card mb-3">
                  <div className="card-header"></div>
                  <div className="card-body" id={`ticket-container-${booking.booking_id}`}>
                    <h4>{booking.film_name}</h4>
                    <p>Booking Id: {booking.booking_id}</p>
                    <p>Date: {booking.date}</p>
                    <p>Time: {booking.time}</p>
                    <p>No. of seats: {booking.no_of_seats}</p>
                    <p>Total Price: {booking.total_price}</p>
                    <QRCode value={JSON.stringify(booking)} size={100}/>
                  </div>
                  <div className="btn btn-dark">
                  <button onClick={() => downloadPdf(`ticket-container-${booking.booking_id}`)}>Download Ticket</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading booking history...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(BookingHistory);




