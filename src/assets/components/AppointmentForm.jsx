import React, { useState } from "react";

const AppointmentForm = ({ itemname, itemspecialization }) => {
  const [showForm, setShowForm] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    cause: "",
    date: "",
    itemname: itemname,
    itemspecialization: itemspecialization,
    isSubmitted: true, // New state to track if form is submitted
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track if form is submitted

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteAppointment = (e) => {
    e.preventDefault(); // Prevent page refresh
  
    // Fetch all appointments
    fetch("http://localhost:3000/appointments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        return response.json();
      })
      .then((appointments) => {
        if (appointments.length === 0) {
          console.log("No appointments to delete");
          return;
        }
  
        // Create an array of DELETE requests for each appointment
        const deletePromises = appointments.map((appointment) =>
          fetch(`http://localhost:3000/appointments/${appointment.id}`, {
            method: "DELETE",
          }).then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to delete appointment with ID: ${appointment.id}`);
            }
          })
        );
  
        // Use Promise.all to wait for all delete requests to complete
        return Promise.all(deletePromises);
      })
      .then(() => {
        setIsSubmitted(false); // Set isSubmitted to false to hide the form
        window.location.reload(); // Reload the page to reflect the changes
        console.log("All appointments have been successfully deleted from the database");
      })
      .catch((error) => {
        console.error("Error deleting appointments:", error);
      });
  };
  

{/*
  //Deletes the last appointment from the database
  const handleDeleteAppointment = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Fetch all appointments
    fetch("http://localhost:3000/appointments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        return response.json();
      })
      .then((appointments) => {
        if (appointments.length === 0) {
          console.log("No appointments to delete");
          return;
        }
        // Get the last appointment in the array
        const lastAppointment = appointments[appointments.length - 1];
        // Send DELETE request to delete the last appointment
        return fetch(`http://localhost:3000/appointments/${lastAppointment.id}`, {
          method: "DELETE",
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to delete appointment with ID: ${lastAppointment.id}`);
          }
        });
      })
      .then(() => {
        setIsSubmitted(false); // Set isSubmitted to false to hide the form
        console.log("The last appointment has been successfully deleted from the database");
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };
*/}

  const handleSubmitForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => {
        if (response.ok) {
          setIsSubmitted(true); // Set the form as submitted
          alert(" Appointment added successfully!");
          setAppointmentData({
            name: "",
            cause: "",
            itemname: itemname,
            itemspecialization: itemspecialization,
            date: "",
            isSubmitted: true,
          });
        } else {
          throw new Error("Failed to add appointment");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div>
      {/* Button to toggle form display */}
      <button onClick={toggleForm}>Book an Appointment</button>

      {/* Appointment form */}
      {showForm && (
        <div className="booking-form-overlay">
          <div className="booking-form2">
            <h3>Dr. {itemname}</h3>
            <h4>Specialization: {itemspecialization}</h4>
            <h2>Book an Appointment</h2>

            {isSubmitted ? (
              <div>
                <label>
                  Name:
                  <input type="text" name="name" disabled />
                </label>
                <label>
                  Cause:
                  <input type="text" name="cause" disabled />
                </label>
                <label>
                  Date:
                  <input type="date" name="date" disabled />
                </label>
                <button onClick={handleDeleteAppointment}>Delete Last Appointment</button>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm}>
                <label>
                  Name:
                  <input type="text" name="name" value={appointmentData.name} onChange={handleFormChange} required />
                </label>
                <label>
                  Cause:
                  <input type="text" name="cause" value={appointmentData.cause} onChange={handleFormChange} required />
                </label>
                <label>
                  Date:
                  <input type="date" name="date" value={appointmentData.date} onChange={handleFormChange} required />
                </label>
                <button type="submit">Submit Appointment</button>
              </form>
            )}
            <button onClick={toggleForm}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
