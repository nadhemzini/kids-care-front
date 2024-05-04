import React, { useState } from 'react'
import { getUserFromLocalStorage } from "../services/GetAdmin";

function Navbar() {
  const userData = getUserFromLocalStorage();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect the user to the login page or perform any other action after logout
    window.location.href = '/';
  }
  console.log(userData);
  return (
    <div> {/* Navbar */}
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4" >
            <i className="bx bx-menu bx-sm" />
          </a>
        </div>
        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          {/* Search */}

          {/* /Search */}
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Place this tag where you want the button to render. */}

            {/* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                  <img src={`http://localhost:8000/images/${userData?.image}`} className="w-px-40 h-auto rounded-circle" />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img src={`http://localhost:8000/images/${userData?.image}`} className="w-px-40 h-auto rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">{userData && userData?.fullname || "none"}</span>
                        <small className="text-muted">{userData?.role}</small>
                      </div>
                    </div>
                  </a>
                </li>
                {userData?.role === 'SuperAdmin' && (
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                )}
                {userData?.role === 'SuperAdmin' && (
                  <li>
                    <a className="dropdown-item" href="/gestion-Profil">
                      <i className="bx bx-user me-2" />
                      <span className="align-middle">My Profile</span>
                    </a>
                  </li>
                )}
                <li>
                  <div className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogout}>
                    <i className="bx bx-power-off me-2" />
                    <span className="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
            {/*/ User */}
          </ul>
        </div>
      </nav>
      {/* / Navbar */}</div>
  )
}

export default Navbar