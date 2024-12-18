import React, { useState } from "react";

const InstantAppointmentForm = ({ itemname, itemspecialization }) => {
  const [showForm, setShowForm] = useState(false);
  const [instantAppointmentData, setInstantAppointmentData] = useState({
    name: "",
    cause: "",
    itemname: itemname,
    itemspecialization: itemspecialization,
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInstantAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/instantappointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instantAppointmentData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Instant Appointment added successfully!");
          setInstantAppointmentData({
            name: "",
            cause: "",
            itemname: itemname,
            itemspecialization: itemspecialization,
          });
          setShowForm(false); // Close the form after submission
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
            <form onSubmit={handleSubmitForm}>
              <label>
                Name:
                <input type="text" name="name" value={instantAppointmentData.name} onChange={handleFormChange} required />
              </label>
              <label>
                Cause:
                <input type="text" name="cause" value={instantAppointmentData.cause} onChange={handleFormChange} required />
              </label>
              <button type="submit">Submit Appointment</button>
            </form>
            <button onClick={toggleForm}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstantAppointmentForm;
