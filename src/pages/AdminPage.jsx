import React, { useState, useEffect } from 'react';
import farmersOverview from './data/farmersData.json';
import driversOverview from './data/driversData.json';
import dailyShopOverview from './data/shop.json';

const API_BASE_URL = '/api';

const pageStyle = {
  backgroundImage: 'url("/farm.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '4rem',
};

const overlayStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.66)',
  borderRadius: '12px',
  padding: '2rem',
};

const AdminPage = ({ summary, onFetchAllFarmersReport, onFetchFinancialReport }) => {
  const [visibleSection, setVisibleSection] = useState(null);
  const toggleSection = (section) => setVisibleSection(prev => (prev === section ? null : section));

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}>
        {/* Summary */}
        <p><strong>Overall Summary:</strong></p>
        <div className="row mb-3">
          <div className="col-md-3"><div className="bg-info text-white p-3 rounded">Total Milk Collected Today: {summary?.totalCollectedToday || 'Loading...'} Litres</div></div>
          <div className="col-md-3"><div className="bg-success text-white p-3 rounded">Total Milk Sold Today: {summary?.totalSoldToday || 'Loading...'} Litres</div></div>
          <div className="col-md-3"><div className="bg-warning text-white p-3 rounded">Total Revenue Today: Ksh {summary?.totalRevenueToday || 'Loading...'}</div></div>
          <div className="col-md-3"><div className="bg-danger text-white p-3 rounded">Outstanding Payments: Ksh {summary?.outstandingPayments || 'Loading...'}</div></div>
        </div>

        {/* Toggle Buttons */}
        <div className="d-flex gap-2 mb-4">
          <button className="btn btn-outline-primary" onClick={() => toggleSection('farmers')}>{visibleSection === 'farmers' ? 'Hide' : 'Show'} Farmers</button>
          <button className="btn btn-outline-success" onClick={() => toggleSection('drivers')}>{visibleSection === 'drivers' ? 'Hide' : 'Show'} Drivers</button>
          <button className="btn btn-outline-warning" onClick={() => toggleSection('shop')}>{visibleSection === 'shop' ? 'Hide' : 'Show'} Shop</button>
        </div>

        {/* Farmers Table */}
        {visibleSection === 'farmers' && (
          <>
            <h3>Farmers Overview</h3>
            <table className="table table-bordered table-striped">
              <thead><tr><th>ID</th><th>Name</th><th>Litres</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {farmersOverview.map(f => (
                  <tr key={f.id}>
                    <td>{f.id}</td><td>{f.name}</td><td>{f.totalLitresThisMonth}</td><td>{f.paymentStatus}</td>
                    <td><button className="btn btn-sm btn-info">View Report</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={onFetchAllFarmersReport}>Generate Report</button>
          </>
        )}

        {/* Drivers Table */}
        {visibleSection === 'drivers' && (
          <>
            <h3>Drivers Overview</h3>
            <table className="table table-bordered table-striped">
              <thead><tr><th>ID</th><th>Name</th><th>Trips</th><th>Collected</th><th>Delivered</th></tr></thead>
              <tbody>
                {driversOverview.map(d => (
                  <tr key={d.id}>
                    <td>{d.id}</td><td>{d.name}</td><td>{d.tripsToday}</td><td>{d.litresCollected}</td><td>{d.litresDelivered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Shop Table */}
        {visibleSection === 'shop' && (
          <>
            <h3>Shop Overview</h3>
            <table className="table table-bordered table-striped">
              <thead><tr><th>Date</th><th>Supplied</th><th>Sold</th><th>Cash</th><th>Action</th></tr></thead>
              <tbody>
                {dailyShopOverview.map(s => (
                  <tr key={s.date}>
                    <td>{s.date}</td><td>{s.milkGiven}</td><td>{s.milkSold}</td><td>{s.cash}</td>
                    <td><button className="btn btn-sm btn-secondary">View Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Accounting Section */}
        <h3 className="mt-4">Accounting</h3>
        <p>Total Revenue (Month): Ksh {summary?.monthlyRevenue || 'Loading...'}</p>
        <p>Total Payments: Ksh {summary?.monthlyPayments || 'Loading...'}</p>
        <p>Expenses: Ksh {summary?.otherExpenses || 'Loading...'}</p>
        <p><strong>Net Profit: Ksh {summary?.netProfit || 'Loading...'}</strong></p>
        <button className="btn btn-success" onClick={onFetchFinancialReport}>Generate Financial Report</button>
      </div>
    </div>
  );
};

export default AdminPage;
