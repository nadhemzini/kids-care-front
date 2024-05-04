import React, { ChangeEvent, useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/Navbar';
import ModalMatiere from '../components/ModalMatiere';
import EditMatiere from '../components/EditMatiere';
import { IMatiere } from "../modals/IMatiere";
import { Await } from 'react-router-dom';
import { DeleteMatiere, getAllMatiere } from '../services/ServicesMatiere';
import toast from 'react-hot-toast';
import { FormControl, InputGroup } from 'react-bootstrap';

function Matiere() {

    const handleClose = () => { setShow(false); setEdit(false) };
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [data, setData] = useState<IMatiere[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<IMatiere[]>([]);
    useEffect(() => {
        // Filter data based on searchQuery
        const filtered = data.filter((matiere) =>
            matiere.nommatiere.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllMatiere()
            setData(response.data.data);
        }
        fetchData();
    }, []);

    const [editingItemId, setEditingItemId] = useState<number>(0);

    const handleShow = () => setShow(true);
    const handleEdit = (id: number) => { setEdit(true); setEditingItemId(id); };

    const handleDelete = async (id: number) => {
        await DeleteMatiere(id)
        const newUser = data.filter(item => item.id !== id); //lhna lazmek ta3ml filter bech tableau mta3k ytbadel 5ater how ynajem ytfasa5 ama y93ed fi table haka 3leh lazmik ta3ml new array bech tfalter faha l id haka bil item.id!=id
        setData(newUser);
        toast.success('Matiere deleted succefully');

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
                                    <h5 className="card-header">Matiere Table</h5>
                                    <div className='row'>
                                        <div className='col-8'>
                                        </div>
                                        <div className='col-4'>
                                            <Button className="position-absolute top-0 end-0 mt-3 me-3" variant="primary" onClick={handleShow}>
                                                <i className='bx bxs-plus-circle'></i>

                                                Add Matiere
                                            </Button>
                                        </div>

                                    </div>
                                    <div className="card-body ">
                                        <div className="table-responsive text-nowrap">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>code de matiére</th>
                                                        <th>nom de matiére</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {filteredData.map(matiere => (
                                                        <tr key={matiere.id}>
                                                            <td>
                                                                <i className="fab fa-angular fa-lg text-danger me-3" /> <strong>{matiere.codematiere}</strong>
                                                            </td>
                                                            <td>{matiere.nommatiere}</td>

                                                            <td>
                                                                <div className="dropdown">
                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                        <i className="bx bx-dots-vertical-rounded" />
                                                                    </button>
                                                                    <div className="dropdown-menu">
                                                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleEdit(matiere.id)}><i className="bx bx-edit-alt me-1" /> Edit</a>
                                                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleDelete(matiere.id)}><i className="bx bx-trash me-1" /> Delete</a>
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
            <ModalMatiere show={show} handleClose={handleClose}></ModalMatiere>
            <EditMatiere id={editingItemId} show={edit} handleClose={handleClose}></EditMatiere>
        </div>
    )
}

export default Matiere