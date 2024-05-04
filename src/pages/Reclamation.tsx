import React, { ChangeEvent, useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/Navbar';
import { IReclamation } from '../modals/IReclamation';

import toast from 'react-hot-toast';
import { Badge } from 'react-bootstrap';
import { getAllReclamations } from '../services/ServiceReclamation';
import { IParent } from '../modals/IParent';
import { geteditParents } from '../services/ServicesParent';
import ModalReclamation from '../components/ModalReclamation';

function Matiere() {
    const [show, setShow] = useState<boolean>(false);
    const [responseId, setResponseId] = useState<number>();
    const handleShow = (id: number) => { setShow(true); setResponseId(id) };
    const handleClose = () => setShow(false);
    const [data, setData] = useState<IReclamation[]>([]);
    console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllReclamations();
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
                        {/* Content wrapper */}
                        <div className="content-wrapper">
                            {/* Content */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div >
                                    <h5 className="card-header">Reclamations</h5>
                                    <div className='row'>
                                        <div className='col-8'>
                                        </div>

                                        <div className="card-body ">
                                            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                                                {data.map((reclamations) => (
                                                    <div className="col">
                                                        <div className="card h-100">
                                                            {reclamations.statue ? (
                                                                <Badge bg="success" className="avatar-status"> Response</Badge>
                                                            ) : (
                                                                <Badge bg="danger" className="avatar-status">No Response</Badge>
                                                            )}
                                                            <div className="card-body">
                                                                <h5 className="card-title">{reclamations.title}</h5>
                                                                <p className="card-text">
                                                                    {reclamations.description}
                                                                </p>
                                                            </div>
                                                            <div className='card-footer '>

                                                                <p className='text-muted'>
                                                                    from  {reclamations.parents.fullname}
                                                                </p>
                                                            </div>

                                                            <div >

                                                                <a className="dropdown-item" onClick={() => handleShow(reclamations.id)} ><i className="bx bx-edit-alt me-1" /> response</a>

                                                            </div>
                                                        </div>
                                                    </div>

                                                ))}
                                            </div>
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
            <ModalReclamation id={responseId} show={show} handleClose={handleClose}></ModalReclamation>

        </div>

    )
}

export default Matiere