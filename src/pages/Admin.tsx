import React, { ReactNode, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Button from 'react-bootstrap/Button';

import Navbar from '../components/Navbar'
import Modal from '../components/ModalAdmin'
import ModalAdmin from '../components/ModalAdmin';
import EditAdmin from '../components/EditAdmin';
import axios from "axios";
import { IAdmin } from '../modals/IAdmin';
import toast from 'react-hot-toast';
import Pagination from 'react-bootstrap/Pagination';
import { FormControl, InputGroup } from 'react-bootstrap';
import { getAllAdmin } from '../services/ServiceAdmin';

function Admin() {

  const [data, setData] = useState<IAdmin[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);




  const handleDelete = async (id: number) => {
    await axios.delete(`http://127.0.0.1:8000/api/removeadmin/${id}`);
    const newUser = data.filter(item => item.id !== id); //lhna lazmek ta3ml filter bech tableau mta3k ytbadel 5ater how ynajem ytfasa5 ama y93ed fi table haka 3leh lazmik ta3ml new array bech tfalter faha l id haka bil item.id!=id
    setData(newUser);
    toast.success('Admin deleted succefully');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAdmin();
      setData(response.data.data);
    }
    fetchData();

  }, []);


  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IAdmin[]>([]);
  useEffect(() => {
    // Filter data based on searchQuery
    const filtered = data.filter((admins) =>
      admins.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const [show, setShow] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number>(0);

  const handleClose = () => { setShow(false); setEdit(false) };

  const handleShow = () => setShow(true);
  const handleEdit = (id: number) => { setEdit(true); setEditingItemId(id); };









  console.log(editingItemId);
  return (


    <div>
      {/* Layout wrapper */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          {/* Menu */}
          <Menu />
          {/* / Menu */}
          {/* Layout container */}
          <div className="layout-page">
            <Navbar />
            <div className="navbar-nav align-items-center pt-3">
              <div className="nav-item d-flex align-items-center">
                {/* <i className="bx bx-search fs-4 lh-0" /> */}
                <InputGroup>
                  <FormControl
                    className="border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card ">
                  <h5 className="card-header">Admin Table</h5>
                  <div className='row'>
                    <div className='col-8'>
                    </div>
                    <div className='col-4'>
                      <a>
                        <Button className="position-absolute top-0 end-0 mt-3 me-3" variant="primary" onClick={handleShow}>
                          <i className='bx bxs-plus-circle'></i>
                          Add Admin
                        </Button>
                      </a>
                    </div>

                  </div>
                  <div className="card-body ">
                    <div className="table-responsive text-nowrap">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Prenom & Nom</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Role</th>
                            <th>Gender</th>
                            <th>Télephone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map(admin => (
                            <tr key={admin.id} >{/* indice lil element li jay  */}
                              <td>
                                <i className="fab fa-angular fa-lg text-danger me-3" /> <strong>{admin.fullname}</strong>
                              </td>
                              <td>{admin.email}</td>
                              <td>
                                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                  <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" data-bs-original-title="Lilian Fuller">
                                    <img src={`http://localhost:8000/images/${admin.image}`} alt="Avatar" className="rounded-circle" />
                                  </li>
                                </ul>
                              </td>
                              <td>{admin.role}</td>
                              <td>{admin.gender}</td>
                              <td><span className="badge bg-label-primary me-1">{admin.telephone}</span></td>

                              <td>
                                {admin.role === "Admin" && (
                                  <div className="dropdown">
                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                      <i className="bx bx-dots-vertical-rounded" />
                                    </button>
                                    < div className="dropdown-menu">
                                      <a className="dropdown-item" onClick={() => { handleEdit(admin.id); }}><i className="bx bx-edit-alt me-1" />Edit</a>
                                      <a className="dropdown-item" onClick={() => handleDelete(admin.id)}><i className="bx bx-trash me-1" /> Delete</a>
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>

                      </table>
                    </div>
                  </div>

                </div>

              </div>
              {/* / Content */}
              {/* Footer */}
              <Footer />
              {/* / Footer */}
              <div className="content-backdrop fade" />
            </div>
            {/* Content wrapper */}
          </div>
          {/* / Layout page */}
        </div>
        {/* Overlay */}
        <div className="layout-overlay layout-menu-toggle" />
      </div>
      {/* / Layout wrapper */}
      <ModalAdmin show={show} handleClose={handleClose} ></ModalAdmin>

      <EditAdmin id={editingItemId} show={edit} handleClose={handleClose}></EditAdmin>

    </div >
  )

}

export default Admin