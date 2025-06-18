import React, { useState } from 'react';
import farmersOverview from './data/farmersData.json';
import driversOverview from './data/driversData.json';
import dailyShopOverview from './data/shop.json';

const pageStyle = {
  backgroundImage: 'url("/farm.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '4rem',
  fontFamily: 'Segoe UI, Roboto, sans-serif',
};

const overlayStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.94)',
  borderRadius: '20px',
  padding: '2.5rem',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
};

const AdminPage = ({ summary, onFetchAllFarmersReport, onFetchFinancialReport }) => {
  const [visibleSection, setVisibleSection] = useState(null);
  const toggleSection = (section) => setVisibleSection(prev => (prev === section ? null : section));
const [farmerData, setFarmerData] = useState(farmersOverview);

const handlePayFarmer = (id) => {
  const updated = farmerData.map(f => 
    f.id === id ? { ...f, paymentStatus: 'Paid' } : f
  );
  setFarmerData(updated);
};

  return (
    <div style={pageStyle}>
      <div style={overlayStyle} className="container">
        <h2 className="mb-5 text-center fw-bold text-primary">Admin Dashboard</h2>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          {[
            { title: 'Total Milk Collected Today', value: `${summary?.totalCollectedToday || 1200} Litres`, color: 'info' },
            { title: 'Total Milk Sold Today', value: `${summary?.totalSoldToday || 84000} Litres`, color: 'success' },
            { title: 'Total Revenue Today', value: `Ksh ${summary?.totalRevenueToday || 5250}`, color: 'warning' },
            { title: 'Outstanding Payments', value: `Ksh ${summary?.outstandingPayments || 78750}`, color: 'danger' },
          ].map((card, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className={`card text-white bg-${card.color} shadow-sm border-0`}>
                <div className="card-body">
                  <h6 className="card-title">{card.title}</h6>
                  <h5 className="card-text fw-semibold">{card.value}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Toggles */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
          <button className="btn btn-outline-primary" onClick={() => toggleSection('farmers')}>
            {visibleSection === 'farmers' ? 'Hide' : 'Show'} Farmers
          </button>
          <button className="btn btn-outline-success" onClick={() => toggleSection('drivers')}>
            {visibleSection === 'drivers' ? 'Hide' : 'Show'} Drivers
          </button>
          <button className="btn btn-outline-warning" onClick={() => toggleSection('shop')}>
            {visibleSection === 'shop' ? 'Hide' : 'Show'} Shop
          </button>
        </div>

        {/* Farmers Table */}
        {visibleSection === 'farmers' && (
          <div className="mb-5">
            <h4 className="mb-3 text-secondary">Farmers Overview</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr><th>ID</th><th>Name</th><th>Litres</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                 {farmerData.map(f => (
  <tr key={f.id}>
    <td>{f.id}</td>
    <td>{f.name}</td>
    <td>{f.totalLitresThisMonth}</td>
    <td>
      <span className={`badge bg-${f.paymentStatus === 'Paid' ? 'success' : 'secondary'}`}>
        {f.paymentStatus}
      </span>
    </td>
    <td>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-info">View Report</button>
        {f.paymentStatus !== 'Paid' && (
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => handlePayFarmer(f.id)}
          >
            Pay
          </button>
        )}
      </div>
    </td>
  </tr>
))}

                </tbody>
              </table>
            </div>
            <button className="btn btn-primary mt-3" onClick={onFetchAllFarmersReport}>Generate Report</button>
          </div>
        )}

        {/* Drivers Table */}
        {visibleSection === 'drivers' && (
          <div className="mb-5">
            <h4 className="mb-3 text-secondary">Drivers Overview</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr><th>ID</th><th>Name</th><th>Trips</th><th>Collected</th><th>Delivered</th></tr>
                </thead>
                <tbody>
                  {driversOverview.map(d => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.tripsToday}</td>
                      <td>{d.litresCollected}</td>
                      <td>{d.litresDelivered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Shop Table */}
        {visibleSection === 'shop' && (
          <div className="mb-5">
            <h4 className="mb-3 text-secondary">Shop Overview</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr><th>Date</th><th>Supplied</th><th>Sold</th><th>Cash</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {dailyShopOverview.map(s => (
                    <tr key={s.date}>
                      <td>{s.date}</td>
                      <td>{s.milkGiven}</td>
                      <td>{s.milkSold}</td>
                      <td>Ksh {s.cash}</td>
                      <td><button className="btn btn-sm btn-outline-secondary">View Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Accounting Summary */}
        <div className="mt-5">
          <h4 className="mb-3 text-secondary">Accounting Summary</h4>
          <ul className="list-group shadow-sm">
            <li className="list-group-item d-flex justify-content-between">
              <span>Total Revenue (Month):</span> <strong>Ksh {summary?.monthlyRevenue || '5200'}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total Payments:</span> <strong>Ksh {summary?.monthlyPayments || '840000'}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Expenses:</span> <strong>Ksh {summary?.otherExpenses || '21000'}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light fw-bold">
              <span>Net Profit:</span> <strong>Ksh {summary?.netProfit || '680000'}</strong>
            </li>
          </ul>
          <button className="btn btn-success mt-3" onClick={onFetchFinancialReport}>Generate Financial Report</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
