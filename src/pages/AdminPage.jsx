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
};

const overlayStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.92)',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 0 12px rgba(0,0,0,0.2)',
};

const AdminPage = ({ summary, onFetchAllFarmersReport, onFetchFinancialReport }) => {
  const [visibleSection, setVisibleSection] = useState(null);
  const toggleSection = (section) => setVisibleSection(prev => (prev === section ? null : section));

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}>
        <h2 className="mb-4 text-center">Admin Dashboard</h2>

        {/* Summary Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card text-white bg-info h-100">
              <div className="card-body">
                <h5>Total Milk Collected Today</h5>
                <p className="card-text">{summary?.totalCollectedToday || 1200} Litres</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success h-100">
              <div className="card-body">
                <h5>Total Milk Sold Today</h5>
                <p className="card-text">{summary?.totalSoldToday || 84000} Litres</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning h-100">
              <div className="card-body">
                <h5>Total Revenue Today</h5>
                <p className="card-text">Ksh {summary?.totalRevenueToday || 5250}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-danger h-100">
              <div className="card-body">
                <h5>Outstanding Payments</h5>
                <p className="card-text">Ksh {summary?.outstandingPayments || 78750}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Toggles */}
        <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
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
          <>
            <h4 className="mb-3">Farmers Overview</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr><th>ID</th><th>Name</th><th>Litres</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {farmersOverview.map(f => (
                    <tr key={f.id}>
                      <td>{f.id}</td>
                      <td>{f.name}</td>
                      <td>{f.totalLitresThisMonth}</td>
                      <td>{f.paymentStatus}</td>
                      <td><button className="btn btn-sm btn-info">View Report</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary mt-2" onClick={onFetchAllFarmersReport}>Generate Report</button>
          </>
        )}

        {/* Drivers Table */}
        {visibleSection === 'drivers' && (
          <>
            <h4 className="mb-3">Drivers Overview</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
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
          </>
        )}

        {/* Shop Table */}
        {visibleSection === 'shop' && (
          <>
            <h4 className="mb-3">Shop Overview</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
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
                      <td><button className="btn btn-sm btn-secondary">View Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Accounting Summary */}
        <div className="mt-5">
          <h4 className="mb-3">Accounting Summary</h4>
          <ul className="list-group mb-3">
            <li className="list-group-item">Total Revenue (Month): Ksh {summary?.monthlyRevenue || 'Loading...'}</li>
            <li className="list-group-item">Total Payments: Ksh {summary?.monthlyPayments || 'Loading...'}</li>
            <li className="list-group-item">Expenses: Ksh {summary?.otherExpenses || 'Loading...'}</li>
            <li className="list-group-item fw-bold">Net Profit: Ksh {summary?.netProfit || 'Loading...'}</li>
          </ul>
          <button className="btn btn-success" onClick={onFetchFinancialReport}>Generate Financial Report</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
