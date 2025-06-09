import React from 'react';

const Navbar = ({ currentPage, setCurrentPage, role, onLogout }) => {
  const navItems = [
    { label: 'Admin Dashboard', key: 'admin', roles: ['admin'] },
    { label: 'Farmers', key: 'farmers', roles: ['admin', 'farmer'] },
    { label: 'Drivers', key: 'drivers', roles: ['admin', 'driver'] },
    { label: 'Daily Shop', key: 'shop', roles: ['admin', 'shop'] },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            {navItems
              .filter(item => item.roles.includes(role))
              .map(item => (
                <li className="nav-item" key={item.key}>
                  <button
                    className={`nav-link btn btn-link ${
                      currentPage === item.key ? 'active fw-bold text-primary' : 'text-dark'
                    }`}
                    onClick={() => setCurrentPage(item.key)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
          </ul>
          <button className="btn btn-outline-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
