// Dashboard.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import AdminPage from './AdminPage';
import FarmersPage from './FarmersPage';
import DriversPage from './DriversPage';
import ShopPage from './ShopPage';

const API_BASE_URL = '/api'; // Replace with your actual API base URL

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
const pageStyle = {
    backgroundImage: 'url("/farm.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    color: 'black',
    padding: '4rem',
  };
    return (
        <Router>
            <div className="container-fluid">

                <Routes>
                    <Route path="/admin" element={
                        <AdminPage
                            summary={summary}
                            farmersOverview={farmersOverview}
                            driversOverview={driversOverview}
                            dailyShopOverview={dailyShopOverview}
                            onFetchAllFarmersReport={fetchAllFarmersMonthlyReport}
                            onFetchFinancialReport={fetchFinancialReport}
                            fetchDailyShopDetails={fetchDailyShopDetails}
                            fetchIndividualFarmerReport={fetchIndividualFarmerReport}
                        />
                    } />
                    <Route path="/farmers" element={
                        <FarmersPage
                            farmerList={farmerList}
                            individualReport={individualFarmerReport}
                            onGenerateReport={handleGenerateIndividualFarmerReport}
                            showFarmerDetails={showFarmerDetails}
                        />
                    } />
                    <Route path="/drivers" element={
                        <DriversPage
                            onSaveActivity={handleSaveDriverActivity}
                            activityLog={driverActivityLog}
                        />
                    } />
                    <Route path="/shop" element={
                        <ShopPage
                            totalMilkGivenShop={totalMilkGivenShop}
                            onRecordShop={handleRecordDailyShop}
                            dailyShopRecords={dailyShopRecords}
                            todaySummary={todayShopSummary}
                        />
                    } />
                    <Route path="/" element={
                        <AdminPage
                            summary={summary}
                            farmersOverview={farmersOverview}
                            driversOverview={driversOverview}
                            dailyShopOverview={dailyShopOverview}
                            onFetchAllFarmersReport={fetchAllFarmersMonthlyReport}
                            onFetchFinancialReport={fetchFinancialReport}
                            fetchDailyShopDetails={fetchDailyShopDetails}
                            fetchIndividualFarmerReport={fetchIndividualFarmerReport}
                        />
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default Dashboard;