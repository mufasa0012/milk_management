import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const API_BASE_URL = '/api'; // Replace with your actual API base URL

const MainAdminDashboard = ({ summary, farmersOverview, driversOverview, dailyShopOverview, onFetchAllFarmersReport, onFetchFinancialReport }) => {
    return (
        <div className="dashboard-section border p-3 rounded mb-3">
            <div className="section-header bg-light p-2 rounded mb-3">Main Admin Dashboard</div>
            <p><strong>Overall Summary:</strong></p>
            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="bg-info text-white p-3 rounded">
                        Total Milk Collected Today: {summary?.totalCollectedToday || 'Loading...'} Litres
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-success text-white p-3 rounded">
                        Total Milk Sold Today: {summary?.totalSoldToday || 'Loading...'} Litres
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-warning text-white p-3 rounded">
                        Total Revenue Today: Ksh {summary?.totalRevenueToday || 'Loading...'}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-danger text-white p-3 rounded">
                        Outstanding Payments: Ksh {summary?.outstandingPayments || 'Loading...'}
                    </div>
                </div>
            </div>

            <h3 className="mt-3">Farmers Overview</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Farmer ID</th>
                        <th>Farmer Name</th>
                        <th>Total Litres This Month</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {farmersOverview?.map(farmer => (
                        <tr key={farmer.id}>
                            <td>{farmer.id}</td>
                            <td>{farmer.name}</td>
                            <td>{farmer.totalLitresThisMonth}</td>
                            <td>{farmer.paymentStatus}</td>
                            <td><button className="btn btn-sm btn-info" onClick={() => fetchIndividualFarmerReport(farmer.id)}>View Report</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={onFetchAllFarmersReport}>Generate All Farmers Report</button>

            <h3 className="mt-3">Drivers Overview</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Driver ID</th>
                        <th>Driver Name</th>
                        <th>Trips Today</th>
                        <th>Litres Collected</th>
                        <th>Litres Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {driversOverview?.map(driver => (
                        <tr key={driver.id}>
                            <td>{driver.id}</td>
                            <td>{driver.name}</td>
                            <td>{driver.tripsToday}</td>
                            <td>{driver.litresCollected}</td>
                            <td>{driver.litresDelivered}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="mt-3">Daily Shop Overview</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Milk Supplied</th>
                        <th>Milk Sold</th>
                        <th>Cash Received</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyShopOverview?.map(shop => (
                        <tr key={shop.date}>
                            <td>{shop.date}</td>
                            <td>{shop.milkGiven}</td>
                            <td>{shop.milkSold}</td>
                            <td>{shop.cash}</td>
                            <td><button className="btn btn-sm btn-secondary" onClick={() => fetchDailyShopDetails(shop.date)}>View Details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="mt-3">Accounting</h3>
            <p>Total Revenue (Month to Date): Ksh {summary?.monthlyRevenue || 'Loading...'}</p>
            <p>Total Payments to Farmers (Month to Date): Ksh {summary?.monthlyPayments || 'Loading...'}</p>
            <p>Other Expenses (Month to Date): Ksh {summary?.otherExpenses || 'Loading...'}</p>
            <p><strong>Net Profit/Loss (Month to Date): Ksh {summary?.netProfit || 'Loading...'}</strong></p>
            <button className="btn btn-success" onClick={onFetchFinancialReport}>Generate Financial Report</button>

            <h3 className="mt-3">Graphs</h3>
            <div className="row">
                <div className="col-md-6">
                    {/* Placeholder for Milk Collection Chart */}
                    <canvas id="milkCollectionChart" width="400" height="300"></canvas>
                </div>
                <div className="col-md-6">
                    {/* Placeholder for Sales Chart */}
                    <canvas id="salesChart" width="400" height="300"></canvas>
                </div>
            </div>
        </div>
    );
};

const FarmersSection = ({ farmerList, individualReport, onGenerateReport }) => {
    const [farmerIdReport, setFarmerIdReport] = useState('');

    const handleGenerateReport = () => {
        onGenerateReport(farmerIdReport);
    };

    return (
        <div className="dashboard-section border p-3 rounded mb-3">
            <div className="section-header bg-light p-2 rounded mb-3">Farmers</div>
            <h3>Farmer List</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Farmer ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {farmerList?.map(farmer => (
                        <tr key={farmer.id}>
                            <td>{farmer.id}</td>
                            <td>{farmer.name}</td>
                            <td>{farmer.location}</td>
                            <td><button className="btn btn-sm btn-info" onClick={() => showFarmerDetails(farmer.id)}>Details</button></td>
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
            <div id="individual-farmer-report" className="mt-3">
                {individualReport && (
                    <>
                        <h3>Monthly Report for Farmer ID: {farmerIdReport}</h3>
                        <pre>{JSON.stringify(individualReport, null, 2)}</pre>
                    </>
                )}
            </div>
        </div>
    );
};

const DriversSection = ({ onSaveActivity, activityLog }) => {
    const [driverId, setDriverId] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [routeGone, setRouteGone] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [litreCarried, setLitreCarried] = useState('');
    const [customerName, setCustomerName] = useState('');

    const handleSaveActivity = () => {
        onSaveActivity({ driverId, vehiclePlate, routeGone, date: tripDate, litreCarried, customerName });
        setDriverId('');
        setVehiclePlate('');
        setRouteGone('');
        setTripDate('');
        setLitreCarried('');
        setCustomerName('');
    };

    return (
        <div className="dashboard-section border p-3 rounded mb-3">
            <div className="section-header bg-light p-2 rounded mb-3">Drivers</div>
            <h3>Record Driver Activity</h3>
            <div className="mb-3">
                <label htmlFor="driver-id" className="form-label">Driver ID:</label>
                <input type="text" className="form-control" id="driver-id" placeholder="Enter Driver ID" value={driverId} onChange={(e) => setDriverId(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="vehicle-plate" className="form-label">Vehicle Plate:</label>
                <input type="text" className="form-control" id="vehicle-plate" placeholder="Enter Plate Number" value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
            </div>
            {/* ... other input groups with Bootstrap classes ... */}
            <div className="mb-3">
                <label htmlFor="route-gone" className="form-label">Route Gone:</label>
                <input type="text" className="form-control" id="route-gone" placeholder="Enter Route" value={routeGone} onChange={(e) => setRouteGone(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="trip-date" className="form-label">Date:</label>
                <input type="date" className="form-control" id="trip-date" value={tripDate} onChange={(e) => setTripDate(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="litre-carried" className="form-label">Total Litres Carried:</label>
                <input type="number" className="form-control" id="litre-carried" placeholder="Enter Litres" value={litreCarried} onChange={(e) => setLitreCarried(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="customer-name" className="form-label">Customer Name:</label>
                <input type="text" className="form-control" id="customer-name" placeholder="Enter Customer Name (if applicable)" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <button className="btn btn-success" onClick={handleSaveActivity}>Save Activity</button>

            <h3 className="mt-3">Driver Activity Log</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vehicle Plate</th>
                        <th>Route</th>
                        <th>Date</th>
                        <th>Litres Carried</th>
                        <th>Customer</th>
                    </tr>
                </thead>
                <tbody>
                    {activityLog?.map(activity => (
                        <tr key={activity.id}>
                            <td>{activity.id}</td>
                            <td>{activity.vehiclePlate}</td>
                            <td>{activity.route}</td>
                            <td>{activity.date}</td>
                            <td>{activity.litreCarried}</td>
                            <td>{activity.customerName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const DailyShopSection = ({ totalMilkGivenShop, onRecordShop, dailyShopRecords, todaySummary }) => {
    const [milkSold, setMilkSold] = useState('');
    const [cashReceived, setCashReceived] = useState('');

    const handleRecordShop = () => {
        onRecordShop({ milkSold: parseFloat(milkSold), cashReceived: parseFloat(cashReceived) });
        setMilkSold('');
        setCashReceived('');
    };

    return (
        <div className="dashboard-section border p-3 rounded mb-3">
            <div className="section-header bg-light p-2 rounded mb-3">Daily Shop</div>
            <p><strong>Total Milk Given Per Shop Today:</strong> {totalMilkGivenShop || 'Loading...'} Litres</p>

            <h3>Record Daily Shop Activity</h3>
            <div className="mb-3">
                <label htmlFor="milk-sold" className="form-label">Milk Sold (Litres):</label>
                <input type="number" className="form-control" id="milk-sold" placeholder="Enter Litres Sold" value={milkSold} onChange={(e) => setMilkSold(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="cash-received" className="form-label">Cash Received (Ksh):</label>
                <input type="number" className="form-control" id="cash-received" placeholder="Enter Cash Received" value={cashReceived} onChange={(e) => setCashReceived(e.target.value)} />
            </div>

            <div className="daily-shop-dashboard mt-3 border p-2 rounded bg-light">
                <h4>Today's Summary</h4>
                <p>Milk Sold: {todaySummary?.totalMilkSold || 0} Litres</p>
                <p>Cash Received: Ksh {todaySummary?.totalCashReceived || 0}</p>
            </div>

            <button className="btn btn-primary mt-3" onClick={handleRecordShop}>Pay & Record</button>

            <h3 className="mt-3">Daily Shop Records</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Milk Given</th>
                        <th>Milk Sold</th>
                        <th>Cash</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyShopRecords?.map(record => (
                        <tr key={record.date}>
                            <td>{record.date}</td>
                            <td>{record.milkGiven}</td>
                            <td>{record.milkSold}</td>
                            <td>{record.cash}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [farmersOverview, setFarmersOverview] = useState([]);
    const [driversOverview, setDriversOverview] = useState([]);
    const [dailyShopOverview, setDailyShopOverview] = useState([]);
    const [farmerList, setFarmerList] = useState([]);
    const [totalMilkGivenShop, setTotalMilkGivenShop] = useState(null);
    const [dailyShopRecords, setDailyShopRecords] = useState([]);
    const [driverActivityLog, setDriverActivityLog] = useState([]);
    const [individualFarmerReport, setIndividualFarmerReport] = useState(null);
    const [todayShopSummary, setTodayShopSummary] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    useEffect(() => {
        // Function to initialize charts
        const initializeCharts = () => {
            const milkCollectionCtx = document.getElementById('milkCollectionChart');
            const salesChartCtx = document.getElementById('salesChart');

            if (milkCollectionCtx) {
                // Example data (replace with your actual data)
                const milkCollectionData = {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Milk Collected (Litres)',
                        data: [15000, 16500, 17000, 15500],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                };
                new Chart(milkCollectionCtx, {
                    type: 'bar',
                    data: milkCollectionData,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            if (salesChartCtx) {
                // Example data (replace with your actual data)
                const salesData = {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Sales Revenue (Ksh)',
                        data: [120000, 135000, 140000, 125000],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                };
                new Chart(salesChartCtx, {
                    type: 'line',
                    data: salesData,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        };

        // Initialize charts after data is loaded
        if (summary) {
            initializeCharts();
        }
    }, [summary]); // Re-run when summary data is available

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    };

    const postData = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error posting data:", error);
            return null;
        }
    };

    const loadDashboardData = async () => {
        const summaryData = await fetchData(`${API_BASE_URL}/admin/summary`);
        setSummary(summaryData);

        const farmersOverviewData = await fetchData(`${API_BASE_URL}/farmers/overview`);
        setFarmersOverview(farmersOverviewData);

        const driversOverviewData = await fetchData(`${API_BASE_URL}/drivers/overview`);
        setDriversOverview(driversOverviewData);

        const dailyShopOverviewData = await fetchData(`${API_BASE_URL}/daily-shop/overview`);
        setDailyShopOverview(dailyShopOverviewData);

        const farmerListData = await fetchData(`${API_BASE_URL}/farmers`);
        setFarmerList(farmerListData);

        const dailyShopTotalGivenData = await fetchData(`${API_BASE_URL}/daily-shop/total-given/today`);
        setTotalMilkGivenShop(dailyShopTotalGivenData?.totalGiven);

        loadDailyShopRecords();
        loadDriverActivityLog();
        loadTodayShopSummary();
    };

    const fetchAllFarmersMonthlyReport = async () => {
        const reportData = await fetchData(`${API_BASE_URL}/reports/farmers/monthly`);
        if (reportData) {
            console.log("All Farmers Monthly Report:", reportData);
            alert("All farmers monthly report data logged to console.");
        }
    };

    const fetchIndividualFarmerReport = async (farmerId) => {
        const reportData = await fetchData(`${API_BASE_URL}/reports/farmers/${farmerId}/monthly`);
        setIndividualFarmerReport(reportData);
    };

    const handleSaveDriverActivity = async (activityData) => {
        const response = await postData(`${API_BASE_URL}/drivers/activity`, activityData);
        if (response && response.success) {
            alert("Driver activity saved successfully!");
            loadDriverActivityLog();
        } else {
            alert("Failed to save driver activity.");
        }
    };

    const loadDriverActivityLog = async () => {
        const driverActivityData = await fetchData(`${API_BASE_URL}/drivers/activity`);
        setDriverActivityLog(driverActivityData);
    };

    const handleRecordDailyShop = async (shopData) => {
        const response = await postData(`${API_BASE_URL}/daily-shop/record`, shopData);
        if (response && response.success) {
            alert("Daily shop record saved successfully!");
            loadDailyShopRecords();
            loadTodayShopSummary();
        } else {
            alert("Failed to save daily shop record.");
        }
    };

    const loadDailyShopRecords = async () => {
        const dailyShopRecordsData = await fetchData(`${API_BASE_URL}/daily-shop/records`);
        setDailyShopRecords(dailyShopRecordsData);
    };

    const loadTodayShopSummary = async () => {
        const todaySummaryData = await fetchData(`${API_BASE_URL}/daily-shop/summary/today`);
        setTodayShopSummary(todaySummaryData);
    };

    const fetchFinancialReport = async () => {
        const reportData = await fetchData(`${API_BASE_URL}/reports/financial`);
        if (reportData) {
            console.log("Financial Report:", reportData);
            alert("Financial report data logged to console.");
        }
    };

    const fetchDailyShopDetails = async (date) => {
        const details = await fetchData(`${API_BASE_URL}/daily-shop/details/${date}`);
        if (details) {
            alert(`Details for ${date}: Milk Given - ${details.milkGiven}, Milk Sold - ${details.milkSold}, Cash - ${details.cash}`);
        }
    };

    const showFarmerDetails = (farmerId) => {
        alert(`Showing details for farmer ${farmerId}... (Details would be fetched via API in a real application)`);
    };

    const handleGenerateIndividualFarmerReport = async (farmerId) => {
        await fetchIndividualFarmerReport(farmerId);
    };

    return (
        <div className="container">
            <MainAdminDashboard
                summary={summary}
                farmersOverview={farmersOverview}
                driversOverview={driversOverview}
                dailyShopOverview={dailyShopOverview}
                onFetchAllFarmersReport={fetchAllFarmersMonthlyReport}
                onFetchFinancialReport={fetchFinancialReport}
            />
            <FarmersSection
                farmerList={farmerList}
                individualReport={individualFarmerReport}
                onGenerateReport={handleGenerateIndividualFarmerReport}
            />
            <DriversSection
                onSaveActivity={handleSaveDriverActivity}
                activityLog={driverActivityLog}
            />
            <DailyShopSection
                totalMilkGivenShop={totalMilkGivenShop}
                onRecordShop={handleRecordDailyShop}
                dailyShopRecords={dailyShopRecords}
                todaySummary={todayShopSummary}
            />
        </div>
    );
};

export default Dashboard;