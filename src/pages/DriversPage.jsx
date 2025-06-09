import React, { useState } from 'react';
import driversData from './data/driversData.json'; // Your drivers JSON file

const DriversPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    route: '',
    vehicleNumber: '',
    tripsToday: '',
    litresCollected: '',
    litresDelivered: '',
  });

  const pageStyle = {
    backgroundImage: 'url("/farm.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '3rem',
    color: 'black',
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: 'auto',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  };

  // Optional: Select driver to load details into input fields
  const handleDriverSelect = (e) => {
    const selectedId = e.target.value;
    const driver = driversData.find((d) => d.id === selectedId);
    if (driver) {
      setFormData({
        id: driver.id,
        name: driver.name,
        route: driver.route,
        vehicleNumber: driver.vehicleNumber,
        tripsToday: driver.tripsToday,
        litresCollected: driver.litresCollected,
        litresDelivered: driver.litresDelivered,
      });
    } else {
      setFormData({
        id: '',
        name: '',
        route: '',
        vehicleNumber: '',
        tripsToday: '',
        litresCollected: '',
        litresDelivered: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted driver details:\n' + JSON.stringify(formData, null, 2));
    // You can replace alert with your submit logic
  };

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <h2 className="mb-4 text-center">Driver Details</h2>

        <div className="mb-3">
          <label htmlFor="driverSelect" className="form-label">Select Driver</label>
          <select
            id="driverSelect"
            className="form-select"
            onChange={handleDriverSelect}
            value={formData.id}
          >
            <option value="">-- Select Driver --</option>
            {driversData.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name} ({driver.id})
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">Driver ID</label>
            <input type="text" id="id" className="form-control" value={formData.id} readOnly />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Driver Name</label>
            <input type="text" id="name" className="form-control" value={formData.name} readOnly />
          </div>
          <div className="mb-3">
            <label htmlFor="route" className="form-label">Route</label>
            <input type="text" id="route" className="form-control" value={formData.route} readOnly />
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleNumber" className="form-label">Vehicle Number</label>
            <input
              type="text"
              id="vehicleNumber"
              className="form-control"
              value={formData.vehicleNumber}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tripsToday" className="form-label">Trips Today</label>
            <input
              type="number"
              id="tripsToday"
              className="form-control"
              value={formData.tripsToday}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="litresCollected" className="form-label">Litres Collected</label>
            <input
              type="number"
              id="litresCollected"
              className="form-control"
              value={formData.litresCollected}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="litresDelivered" className="form-label">Litres Delivered</label>
            <input
              type="number"
              id="litresDelivered"
              className="form-control"
              value={formData.litresDelivered}
              readOnly
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriversPage;
