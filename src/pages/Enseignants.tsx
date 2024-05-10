import React, { ChangeEvent, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Button from "react-bootstrap/Button";
import Input from "../components/Input";
import Selection from "../components/Selection";
import Buttons from "../components/Buttons";
import Navbar from "../components/Navbar";
import Modal from "../components/ModalAdmin";
import ModalAdmin from "../components/ModalAdmin";
import ModalEnfant from "../components/ModalEnfant";
import EditEnseignant from "../components/EditEnseignant";
import ModalEnseignants from "../components/ModalEnseignants";  
import { getAllEnseignant } from "../services/ServiceEnseignant";
import { IEnseignant } from "../modals/IEnseignant";
import { FormControl, InputGroup } from "react-bootstrap";
import { Pagination } from "react-bootstrap"; // Import Pagination component

function Enseignants() {
  const [show, setShow] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<IEnseignant[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IEnseignant[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Items per page
  useEffect(() => {
    // Filter data based on searchQuery
    const filtered = data.filter((enseignant) =>
      enseignant.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClose = () => {
    setShow(false);
    setEdit(false);
  };

  const handleShow = () => setShow(true);
  const handleEdit = () => setEdit(true);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getAllEnseignant();
      setData(response.data.data);
    };
    fetchdata();
  }, []);
  console.log(data);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
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
                {/* <InputGroup>
                  <FormControl
                    className="border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </InputGroup> */}
              </div>
            </div>
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                <h5 className="card-header">Enseignant Table</h5>
    <div className="card-body">
        <div className="row">
            <div className="col-4">
                {/* Search input */}
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search..."
                        aria-label="Search..."
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </InputGroup>
            </div>
            <div className="col-4"></div>
            <div className="col-4 d-flex justify-content-end">
                {/* Add Enseignant button */}
                <Button
                    variant="primary"
                    onClick={handleShow}
                >
                    <i className="bx bxs-plus-circle"></i>
                    Add Enseignant
                </Button>
            </div>
        </div>
    </div>
                  <div className="card-body ">
                    <div className="table-responsive text-nowrap">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Prenom & Nom</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>image</th>
                            <th>classes</th>
                            <th>matiéres</th>
                            <th>genre</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((enseignant) => (
                            <tr key={enseignant.id}>
                              <td>
                                <i className="fab fa-angular fa-lg text-danger me-3" />{" "}
                                <strong>{enseignant.fullname}</strong>
                              </td>
                              <td>{enseignant.email}</td>
                              <td>
                                <span>{enseignant.telephone}</span>
                              </td>
                              <td>
                                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                  <li
                                    data-bs-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-bs-placement="top"
                                    className="avatar avatar-xs pull-up"
                                    data-bs-original-title="Lilian Fuller"
                                  >
                                    <img
                                      className="rounded-circle"
                                      src={`http://localhost:8000/images/${enseignant.image}`}
                                      alt="Avatar"
                                    />
                                  </li>
                                </ul>
                              </td>
                              <td>
                                <span>
                                  <ul>
                                    {enseignant.classes?.map((classes) => (
                                      <li key={classes.id}>
                                        {classes.nom_de_class}
                                      </li>
                                    ))}
                                  </ul>
                                </span>
                              </td>
                              <td>
                                <span>
                                  {" "}
                                  <ul>
                                    {enseignant.matieres?.map((matiere) => (
                                      <li key={matiere.id}>
                                        {matiere.nommatiere}
                                      </li>
                                    ))}
                                  </ul>
                                </span>
                              </td>

                              <td>
                                <span className="badge bg-label-primary me-1">
                                  {enseignant.gender}
                                </span>
                              </td>
                              <td>
                                <div className="dropdown">
                                  <button
                                    type="button"
                                    className="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown"
                                  >
                                    <i className="bx bx-dots-vertical-rounded" />
                                  </button>
                                  <div className="dropdown-menu">
                                    <a
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                      onClick={handleEdit}
                                    >
                                      <i className="bx bx-edit-alt me-1" /> Edit
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i className="bx bx-trash me-1" /> Delete
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Pagination className="mt-3 justify-content-center">
                        {Array.from(
                          { length: Math.ceil(data.length / itemsPerPage) },
                          (_, i) => (
                            <Pagination.Item
                              key={i + 1}
                              onClick={() => paginate(i + 1)}
                              active={i + 1 === currentPage}
                            >
                              {i + 1}
                            </Pagination.Item>
                          )
                        )}
                      </Pagination>
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
      <ModalEnseignants
        show={show}
        handleClose={handleClose}
      ></ModalEnseignants>
      <EditEnseignant show={edit} handleClose={handleClose}></EditEnseignant>
    </div>
  );
}

export default Enseignants;
