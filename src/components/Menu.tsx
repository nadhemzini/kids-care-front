import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { getUserFromLocalStorage } from "../services/GetAdmin";

function Menu() {

  const [btn, setBtn] = useState<boolean>(false)




  const location = useLocation();
  const userData = getUserFromLocalStorage();
  return (

    <div className="menu">
      <div id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
        <div className="app-brand demo">
          <a href="/" className="app-brand-link">
            <img
              src="/assets/img/avatars/Image1.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <span className="app-brand-text demo menu-text fw-bolder ms-2">KidsCare</span>
          </a>

          <a href="javascript:void(0)" className="layout- menu-link text-large ms-auto d-block d-xl-none">
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>
        <ul className="menu-inner py-1">

          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/dashboard' ? ' active' : ''} `}>
              <NavLink to="/dashboard" className="menu-link">
                <i className='bx bxs-dashboard'></i>
                <div data-i18n="Analytics">Dashboard</div>
              </NavLink >
            </li>
          )}
          {userData?.role == 'SuperAdmin' && (
            <li className={`menu-item ${location.pathname === '/gestion-admins' ? ' active' : ''} `}>
              <NavLink to="/gestion-admins" className="menu-link ">
                <i className='bx bxs-user'></i>
                <div data-i18n="Layouts">Administrateurs</div>
              </NavLink >
            </li>
          )}
          {userData?.role == 'enseignant' && (
            <li className={`menu-item ${location.pathname === '/getion-Homework' ? ' active' : ''} `}>
              <NavLink to="/getion-Homework" className="menu-link ">
                <i className='bx bxs-user'></i>
                <div data-i18n="Layouts">Homework</div>
              </NavLink >
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-enfant' ? ' active' : ''}`}>
              <NavLink to="/gestion-enfant" className="menu-link">
                <i className='bx bxs-user-circle'></i>
                <div data-i18n="Account Settings">Enfant</div>
              </NavLink>
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-parent' ? ' active' : ''} `}>
              <NavLink to="/gestion-parent" className="menu-link ">
                <i className='bx bxs-group' ></i>
                <div data-i18n="Authentications">Parent</div>
              </NavLink >
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-Enseignants' ? ' active' : ''} `}>
              <NavLink to="/gestion-Enseignants" className="menu-link ">
                <i className='bx bxs-user-badge'></i>
                <div data-i18n="Misc">Enseignants</div>
              </NavLink >
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-Class' ? ' active' : ''} `}>
              <NavLink to="/gestion-Class" className="menu-link">
                <i className='bx bxs-graduation'></i>
                <div data-i18n="Basic">Class</div>
              </NavLink >
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-Evenement' ? ' active' : ''} `}>
              <NavLink to="/gestion-Evenement" className="menu-link">
                <i className='bx bxs-collection'></i>
                <div data-i18n="Basic">Événement</div>
              </NavLink >
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-Matiere' ? ' active' : ''} `}>
              <NavLink to="/gestion-Matiere" className="menu-link ">
                <i className='bx bxs-box'></i>
                <div data-i18n="User interface">Matiéres</div>
              </NavLink   >
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-Post' ? ' active' : ''} `}>
              <NavLink to="/gestion-Post" className="menu-link ">
                <i className='bx bx-repost'></i>
                <div data-i18n="User interface">Post</div>
              </NavLink   >
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-messages' ? ' active' : ''} `}>
              <NavLink to="/gestion-messages" className="menu-link ">
                <i className='bx bxs-chat'></i>
                <div data-i18n="User interface">Message</div>
              </NavLink >
            </li>
          )}
          {['SuperAdmin', 'Admin'].includes(userData?.role || '') && (
            <li className={`menu-item ${location.pathname === '/gestion-Reclamation' ? ' active' : ''} `}>
              <NavLink to="/gestion-Reclamation" className="menu-link ">
                <i className='bx bxs-help-circle' ></i>
                <div data-i18n="User interface">Réclamation</div>
              </NavLink >
            </li>
          )}
        </ul>
      </div>
    </div>

  )
}

export default Menu