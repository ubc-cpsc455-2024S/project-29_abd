import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./TripView.css"; // Import the CSS file

const fetchDayCards = async (tripId, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/trip/${tripId}`,
      {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch day cards");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching day cards:", error);
    throw error;
  }
};

const TripView = ({ printable }) => {
  const { tripId } = useParams();
  const [dayCards, setDayCards] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getDayCards = async () => {
      try {
        const cards = await fetchDayCards(tripId, token);
        setDayCards(cards);
      } catch (error) {
        console.error("Error fetching day cards:", error);
      }
    };

    getDayCards();
  }, [tripId, token]);

  const handleGeneratePDF = () => {
    const input = document.getElementById("trip-details");
    input.classList.add("pdf-print"); // Add the class to adjust the style for PDF

    html2canvas(input, { scale: 2 }).then((canvas) => {
      // Increased scale for better resolution
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`trip_${tripId}.pdf`);
      input.classList.remove("pdf-print"); // Remove the class after generating the PDF
    });
  };

  if (!dayCards.length) {
    return <p>Loading...</p>;
  }

  return (
    <div id="trip-details" className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trip Details</h1>
      {dayCards.map((card) => (
        <div
          key={card._id}
          className="mb-4 p-4 border border-gray-200 rounded shadow-sm"
        >
          <h2 className="text-xl font-semibold">{card.title}</h2>
          <p>{card.description}</p>
          <p>
            <strong>Date:</strong> {new Date(card.date).toLocaleDateString()}
          </p>
          {card.locations && card.locations.length > 0 && (
            <div>
              <strong>Locations:</strong>
              <ul>
                {card.locations.map((location, index) => (
                  <li key={index}>{location}</li>
                ))}
              </ul>
            </div>
          )}
          {card.notes && (
            <p>
              <strong>Notes:</strong> {card.notes}
            </p>
          )}
        </div>
      ))}
      {printable && (
        <Button id="pdf-button" onClick={handleGeneratePDF} className="mt-4">
          Download PDF
        </Button>
      )}
    </div>
  );
};

export default TripView;
