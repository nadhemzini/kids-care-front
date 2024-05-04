import React, { ChangeEvent, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Button from 'react-bootstrap/Button';
import Navbar from '../components/Navbar'
import ModalClass from '../components/ModalClass';
import EditClass from '../components/EditClass';
import { FormControl, InputGroup, Modal } from 'react-bootstrap';
import { IClass } from '../modals/IClass';
import { DeleteClass, getAllClass } from '../services/ServicesClass';
import toast from 'react-hot-toast';

function Class() {
    const [data, setData] = useState<IClass[]>([]);
    console.log(data);
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<IClass[]>([]);
    useEffect(() => {
        // Filter data based on searchQuery
        const filtered = data.filter((classes) =>
            classes.nom_de_class.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };
    const handleDelete = async (id: number) => {
        await DeleteClass(id);
        const newUser = data.filter(item => item.id !== id); //lhna lazmek ta3ml filter bech tableau mta3k ytbadel 5ater how ynajem ytfasa5 ama y93ed fi table haka 3leh lazmik ta3ml new array bech tfalter faha l id haka bil item.id!=id
        setData(newUser);
        toast.success('Class deleted succefully');

    };
    const handleClose = () => { setShow(false); setEdit(false) };
    const handleShow = () => setShow(true);
    const handleEdit = (id: number) => { setEdit(true); setEditingItemId(id); };
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const handleModalShow = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setShowModal(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllClass();
            setData(response.data.data);
        }
        fetchData();

    }, []);
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
                                    <h5 className="card-header">Classe Table</h5>
                                    <div className='row'>
                                        <div className='col-8'>
                                        </div>
                                        <div className='col-4'>
                                            <Button className="position-absolute top-0 end-0 mt-3 me-3" variant="primary" onClick={handleShow}>
                                                <i className='bx bxs-plus-circle'></i>
                                                Add Class
                                            </Button>
                                        </div>

                                    </div>
                                    <div className="card-body ">
                                        <div className="table-responsive text-nowrap">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Nom de Class</th>
                                                        <th>Emploi de Class</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.map(classes => (
                                                        <tr key={classes.id}>
                                                            <td>
                                                                <i className="fab fa-angular fa-lg text-danger me-3" /> <strong> {classes.nom_de_class}</strong>
                                                            </td>
                                                            <td>
                                                                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" data-bs-original-title="Lilian Fuller">
                                                                        <img className='rounded-circle' src={`http://localhost:8000/images/${classes.emploi_de_temps}`} onClick={() => handleModalShow(`http://localhost:8000/images/${classes.emploi_de_temps}`)}
                                                                            alt="Avatar" />
                                                                    </li>


                                                                </ul>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                        <i className="bx bx-dots-vertical-rounded" />
                                                                    </button>
                                                                    <div className="dropdown-menu">
                                                                        <a className="dropdown-item" href="javascript:void(0); " onClick={() => handleEdit(classes.id)} ><i className="bx bx-edit-alt me-1" /> Edit</a>
                                                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleDelete(classes.id)}><i className="bx bx-trash me-1" /> Delete</a>
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
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Emploi de temps</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={selectedImage} alt="Your Image" className="img-fluid" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* / Layout wrapper */}
            <ModalClass show={show} handleClose={handleClose}></ModalClass>
            <EditClass id={editingItemId} show={edit} handleClose={handleClose}></EditClass>
        </div >
    )
}

export default Class