import React, { useState } from 'react';
import farmersOverview from './data/farmersData.json';
import jsPDF from 'jspdf';

const FarmersPage = ({ individualReport, onGenerateReport }) => {
    const [farmerIdReport, setFarmerIdReport] = useState('');
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const handleGenerateReport = () => {
        onGenerateReport(farmerIdReport);
    };

    const handleViewReport = (farmer) => {
        setSelectedFarmer(farmer);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedFarmer(null);
        setShowDialog(false);
    };

    const generatePdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Farmer Report", 20, 20);
        doc.setFontSize(12);
        doc.text(`ID: ${selectedFarmer.id}`, 20, 40);
        doc.text(`Name: ${selectedFarmer.name}`, 20, 50);
        doc.text(`Location: ${selectedFarmer.location}`, 20, 60);
        doc.text(`Total Litres This Month: ${selectedFarmer.totalLitresThisMonth}`, 20, 70);
        doc.text(`Payment Status: ${selectedFarmer.paymentStatus}`, 20, 80);
        doc.save(`${selectedFarmer.name}_Report.pdf`);
    };

    const contentStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '2rem',
        borderRadius: '10px',
        maxWidth: '800px',
        margin: 'auto',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        minHeight: '100vh',
    };

    const pageStyle = {
        backgroundImage: 'url("/farm.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black',
    };
    

    return (
        <div style={pageStyle}>
            <div className="dashboard-section border p-3 rounded mb-3" style={contentStyle}>
                <div className="section-header bg-light p-2 rounded mb-3">Farmers</div>

                <h3>Farmer List</h3>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr><th>ID</th><th>Name</th><th>Litres</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {farmersOverview.map(f => (
                            <tr key={f.id}>
                                <td>{f.id}</td>
                                <td>{f.name}</td>
                                <td>{f.totalLitresThisMonth}</td>
                                <td>{f.paymentStatus}</td>
                                <td>
                                    <button className="btn btn-sm btn-info" onClick={() => handleViewReport(f)}>View Report</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Individual Farmer Report</h3>
                <div className="mb-3">
                    <label htmlFor="farmer-id-report" className="form-label">Select Farmer ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="farmer-id-report"
                        placeholder="Enter Farmer ID"
                        value={farmerIdReport}
                        onChange={(e) => setFarmerIdReport(e.target.value)}
                    />
                </div>
                <button className="btn btn-warning" onClick={handleGenerateReport}>Generate Monthly Report</button>

                {individualReport && (
                    <div id="individual-farmer-report" className="mt-3">
                        <h3>Monthly Report for Farmer ID: {farmerIdReport}</h3>
                        <pre>{JSON.stringify(individualReport, null, 2)}</pre>
                    </div>
                )}

                {/* Dialog Modal */}
                {showDialog && selectedFarmer && (
                    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Farmer Details</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseDialog}></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>ID:</strong> {selectedFarmer.id}</p>
                                    <p><strong>Name:</strong> {selectedFarmer.name}</p>
                                    <p><strong>Location:</strong> {selectedFarmer.location}</p>
                                    <p><strong>Litres This Month:</strong> {selectedFarmer.totalLitresThisMonth}</p>
                                    <p><strong>Status:</strong> {selectedFarmer.paymentStatus}</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={handleCloseDialog}>Close</button>
                                    <button className="btn btn-primary" onClick={generatePdf}>Generate Report PDF</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FarmersPage;
