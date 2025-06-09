import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import FarmersPage from './pages/FarmersPage';
import DriversPage from './pages/DriversPage';
import ShopPage from './pages/ShopPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [role, setRole] = useState(null);

  // Restore login from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
      const pageMap = {
        admin: 'dashboard',
        farmer: 'farmers',
        driver: 'drivers',
        shop: 'shop',
      };
      setCurrentPage(pageMap[savedRole] || 'dashboard');
    }
  }, []);

  const handleLogin = (userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);
    const pageMap = {
      admin: 'dashboard',
      farmer: 'farmers',
      driver: 'drivers',
      shop: 'shop',
    };
    setCurrentPage(pageMap[userRole] || 'dashboard');
  };

  const handleLogout = () => {
    setRole(null);
    setCurrentPage('dashboard');
    localStorage.removeItem('role');
  };

  const Unauthorized = () => (
    <div className="alert alert-danger text-center mt-5">You are not authorized to view this page.</div>
  );

  const renderPage = () => {
    if (!role) return <Login onLogin={handleLogin} />;

    if (currentPage === 'dashboard') return role === 'admin' ? <Dashboard /> : <Unauthorized />;
    if (currentPage === 'admin') return role === 'admin' ? <AdminPage /> : <Unauthorized />;
    if (currentPage === 'farmers') return ['admin', 'farmer'].includes(role) ? <FarmersPage /> : <Unauthorized />;
    if (currentPage === 'drivers') return ['admin', 'driver'].includes(role) ? <DriversPage /> : <Unauthorized />;
    if (currentPage === 'shop') return ['admin', 'shop'].includes(role) ? <ShopPage /> : <Unauthorized />;

    return <Unauthorized />;
  };

  return (
    <div>
      {role && (
        <div className="bg-dark py-3 text-center text-white">
          <h1 className="m-0">Milk Management System</h1>
        </div>
      )}
      {role && (
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          role={role}
          onLogout={handleLogout}
        />
      )}
      <div className="container mt-4">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
