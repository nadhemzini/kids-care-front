import React, { ChangeEvent, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Button from 'react-bootstrap/Button';
import Input from '../components/Input'
import Selection from '../components/Selection'
import Buttons from '../components/Buttons'
import Navbar from '../components/Navbar'
import Modal from '../components/ModalAdmin'
import ModalParent from '../components/ModalParent';
import EditParent from '../components/EditParent';
import { IParent } from '../modals/IParent';
import { DeleteParent, getAllParent } from '../services/ServicesParent';
import toast from 'react-hot-toast';
import { FormControl, InputGroup } from 'react-bootstrap';

function Enfant() {
    const [data, setData] = useState<IParent[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<IParent[]>([]);
    useEffect(() => {
        // Filter data based on searchQuery
        const filtered = data.filter((Parent) =>
            Parent.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleClose = () => { setShow(false); setEdit(false) };

    const handleShow = () => setShow(true);
    const handleEdit = (id: number) => { setEdit(true); setEditingItemId(id) };
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllParent();
            setData(response.data.data);
        }
        fetchData();

    }, []);
    const handleDelete = async (id: number) => {
        await DeleteParent(id)
        const newUser = data.filter(item => item.id !== id); //lhna lazmek ta3ml filter bech tableau mta3k ytbadel 5ater how ynajem ytfasa5 ama y93ed fi table haka 3leh lazmik ta3ml new array bech tfalter faha l id haka bil item.id!=id
        setData(newUser);
        toast.success('Parent deleted succefully');

    };
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
                                <div className="card">
                                    <h5 className="card-header">Parent Table</h5>
                                    <div className='row'>
                                        <div className='col-8'>

                                        </div>
                                        <div className='col-4'>
                                            <Button className="position-absolute top-0 end-0 mt-3 me-3" variant="primary" onClick={handleShow}>
                                                <i className='bx bxs-plus-circle'></i>
                                                Add Parent
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="card-body ">
                                        <div className="table-responsive text-nowrap">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Prenom & Nom</th>

                                                        <th>Image</th>
                                                        <th>Cin</th>
                                                        <th>Email</th>
                                                        <th>Gendre</th>
                                                        <th>Télephone</th>
                                                        <th>Ville</th>
                                                        <th>Code Postal</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.map(parent => (
                                                        <tr key={parent.id}>
                                                            <td>
                                                                <i className="fab fa-angular fa-lg text-danger me-3" /> <strong>{parent.fullname}</strong>
                                                            </td>
                                                            <td>
                                                                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" data-bs-original-title="Lilian Fuller">
                                                                        <img src={`http://localhost:8000/images/${parent.image}`} alt="Avatar" className="rounded-circle" />
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                            <td>{parent.cin}</td>
                                                            <td><span className="fab fa-angular fa-lg  me-3">{parent.email}</span></td>
                                                            <td><span className="fab fa-angular fa-lg  me-3">{parent.gender}</span></td>
                                                            <td><span className="fab fa-angular fa-lg  me-3">{parent.telephone}</span></td>
                                                            <td><span className="fab fa-angular fa-lg  me-3">{parent.ville}</span></td>
                                                            <td><span className="badge bg-label-primary me-1">{parent.codepostal}</span></td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                        <i className="bx bx-dots-vertical-rounded" />
                                                                    </button>
                                                                    <div className="dropdown-menu">
                                                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleEdit(parent.id)}><i className="bx bx-edit-alt me-1" /> Edit</a>
                                                                        <a className="dropdown-item" href="javascript:void(0);  " onClick={() => handleDelete(parent.id)}><i className="bx bx-trash me-1" /> Delete</a>
                                                                    </div>
                                                                </div>
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
            <ModalParent show={show} handleClose={handleClose}></ModalParent>
            <EditParent id={editingItemId} show={edit} handleClose={handleClose}></EditParent>
        </div>
    )
}

export default Enfant