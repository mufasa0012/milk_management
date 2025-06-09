import React, { useState } from 'react';

const ShopPage = ({ totalMilkGivenShop, onRecordShop, dailyShopRecords, todaySummary }) => {
  const [milkSoldKsh, setMilkSoldKsh] = useState('');
  const [cashReceived, setCashReceived] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const milkSoldValue = parseFloat(milkSoldKsh) || 0;
  const cash = parseFloat(cashReceived) || 0;
  const changeToReturn = cash - milkSoldValue;

  const handlePayClick = () => {
    if (!milkSoldKsh || !cashReceived) {
      alert('Please enter both Milk Sold and Cash Received');
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const newRecord = {
      date: new Date().toLocaleDateString(),
      milkGiven: totalMilkGivenShop,
      milkSoldKsh: milkSoldValue,
      cash: cash,
    };

    onRecordShop(newRecord);
    setMilkSoldKsh('');
    setCashReceived('');
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const pageStyle = {
    backgroundImage: 'url("/shop.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '4rem',
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    color: '#333',
  };

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <div className="text-center mb-4">
          <h2>Daily Shop</h2>
          <p><strong>Total Milk Given Today:</strong> {totalMilkGivenShop || 0} Litres</p>
        </div>

        <h4>Record Milk Sale</h4>
        <div className="mb-3">
          <label className="form-label">Milk Sold (Ksh)</label>
          <input
            type="number"
            className="form-control"
            value={milkSoldKsh}
            onChange={(e) => setMilkSoldKsh(e.target.value)}
            placeholder="e.g. 1000"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cash Received (Ksh)</label>
          <input
            type="number"
            className="form-control"
            value={cashReceived}
            onChange={(e) => setCashReceived(e.target.value)}
            placeholder="e.g. 1200"
          />
        </div>

        <div className="mb-3 bg-light p-3 rounded">
          <p><strong>Total Sale Value:</strong> Ksh {milkSoldValue.toFixed(2)}</p>
          <p><strong>Cash Received:</strong> Ksh {cash.toFixed(2)}</p>
          <p><strong>Change to Return:</strong> Ksh {changeToReturn >= 0 ? changeToReturn.toFixed(2) : 0}</p>
        </div>

        <button className="btn btn-primary w-100" onClick={handlePayClick}>
          Pay & Record
        </button>

        <div className="mt-5">
          <h4>Today's Summary</h4>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              Milk Sold: <strong>{todaySummary?.totalMilkSold || 70} Litres</strong>
            </li>
            <li className="list-group-item">
              Cash Received: <strong>Ksh {todaySummary?.totalCashReceived || 7000}</strong>
            </li>
            <li className="list-group-item">
              Total Change Returned: <strong>Ksh {todaySummary?.totalChangeReturned || 300}</strong>
            </li>
          </ul>

          <h4>Daily Shop Records</h4>
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Milk Given (Litres)</th>
                <th>Milk Sold (Ksh)</th>
                <th>Cash Received (Ksh)</th>
              </tr>
            </thead>
            <tbody>
              {dailyShopRecords?.length > 0 ? (
                dailyShopRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.milkGiven}</td>
                    <td>Ksh {record.milkSoldKsh}</td>
                    <td>Ksh {record.cash}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showConfirm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Sale</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <p><strong>Milk Sold:</strong> Ksh {milkSoldValue.toFixed(2)}</p>
                <p><strong>Cash Received:</strong> Ksh {cash.toFixed(2)}</p>
                <p><strong>Change to Return:</strong> Ksh {changeToReturn >= 0 ? changeToReturn.toFixed(2) : 0}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShopPage;
