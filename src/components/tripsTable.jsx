import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "./ConfirmationModal";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Fetch all trips for the user
const fetchTrips = async (userID) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/trips`
    );
    if (!response.ok) {
      console.error("Error fetching trips:", response);
      throw new Error("Failed to fetch trips");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
};

// Delete a specific trip by its ID
const deleteTrip = async (tripId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/trips/${tripId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete trip");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
};

// Fetch details of a specific trip by its ID
const fetchTripDetails = async (tripId) => {
  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/trips/${tripId}`;
    console.log(`Fetching trip details from URL: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch trip details: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching trip details:", error);
    return null;
  }
};

// Fetch day cards for a specific trip by its ID
const fetchDayCards = async (tripId) => {
  try {
    const url = `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/day-cards?tripId=${tripId}`;
    console.log(`Fetching day cards from URL: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch day cards: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching day cards:", error);
    return [];
  }
};

const TripsTable = ({ userID }) => {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [refreshTrips, setRefreshTrips] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrips = async () => {
      const tripsList = await fetchTrips(userID);
      setTrips(tripsList);
    };

    getTrips();
  }, [userID, refreshTrips]);

  const handleViewClick = (tripId) => {
    navigate(`/trips/${tripId}`);
  };

  const handleDeleteClick = (tripId) => {
    setTripToDelete(tripId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (tripToDelete) {
      try {
        await deleteTrip(tripToDelete);
        setTrips((prevTrips) =>
          prevTrips.filter((trip) => trip._id !== tripToDelete)
        );
        setIsModalOpen(false);
        setTripToDelete(null);
      } catch (error) {
        console.error("Failed to delete trip:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setTripToDelete(null);
  };

  const handleShare = async (tripId) => {
    try {
      console.log(`Fetching trip details for tripId: ${tripId}`);
      const trip = await fetchTripDetails(tripId);
      console.log(`Trip details: ${JSON.stringify(trip)}`);

      console.log(`Fetching day cards for tripId: ${tripId}`);
      const dayCards = await fetchDayCards(tripId);
      console.log(`Day cards: ${JSON.stringify(dayCards)}`);

      if (!trip || dayCards.length === 0) {
        alert("Failed to load trip details or day cards. Please try again.");
        return;
      }

      const tripDetailsElement = document.createElement("div");
      tripDetailsElement.id = `trip-details-${tripId}`;
      tripDetailsElement.style.display = "none";
      tripDetailsElement.innerHTML = `
        <h2>${trip.name}</h2>
        <p>${trip.description}</p>
        <p>Start Date: ${new Date(trip.startDate).toLocaleDateString()}</p>
        <p>End Date: ${new Date(trip.endDate).toLocaleDateString()}</p>
        <p>Public: ${trip.public ? "Yes" : "No"}</p>
        <h3>Day Cards</h3>
        ${dayCards
          .map(
            (day) => `
          <div style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px;">
            <h4>${day.title}</h4>
            <p>${day.details}</p>
            <p>Country: ${day.country}</p>
            <p>City: ${day.city.join(", ")}</p>
            <p>Locations: ${day.locations.join(", ")}</p>
            <p>Notes: ${day.notes}</p>
            <p>Date: ${new Date(day.date).toLocaleDateString()}</p>
          </div>
        `
          )
          .join("")}
      `;
      document.body.appendChild(tripDetailsElement);

      tripDetailsElement.style.display = "block"; // Ensure it's visible for capturing

      const canvas = await html2canvas(tripDetailsElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`trip-${tripId}.pdf`);

      document.body.removeChild(tripDetailsElement); // Remove the element after capturing
    } catch (error) {
      console.error("Failed to share trip:", error);
      alert("Failed to share trip. Please try again.");
    }
  };

  const handleRefreshTrips = () => {
    setRefreshTrips((prevState) => !prevState);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Current Trips</h1>
      <Table>
        <TableCaption>List of your current trips</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Trip Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Public</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Share</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow
              key={trip._id}
              id={`trip-${trip._id}`}
              className="hover:bg-gray-50"
            >
              <TableCell className="px-4 py-2">
                <div className="text-sm text-gray-500">{trip.name}</div>
              </TableCell>
              <TableCell className="px-4 py-2">
                <div className="text-sm text-gray-500">{trip.description}</div>
              </TableCell>
              <TableCell className="px-4 py-2">
                <div className="text-sm text-gray-500">
                  {new Date(trip.startDate).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="px-4 py-2">
                <div className="text-sm text-gray-500">
                  {new Date(trip.endDate).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="px-4 py-2">
                <div className="text-sm text-gray-500">
                  {trip.public ? "Yes" : "No"}
                </div>
              </TableCell>
              <TableCell className="px-4 py-2 space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => handleViewClick(trip._id)}
                >
                  View
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClick(trip._id)}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleShare(trip._id)}>📄</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this trip?"
      />
    </div>
  );
};

export default TripsTable;
