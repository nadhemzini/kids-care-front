import { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { Button } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { IHomework } from '../modals/IHomework'
import { getAllHomeworks } from '../services/ServiceHomework';

import ModalHomework from '../components/ModalHomework'

function Homework() {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => { setShow(false); };
    const handleShow = () => setShow(true);

    const [data, setData] = useState<IHomework[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllHomeworks();
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
                                <div className="card">
                                    <Button onClick={handleShow} className="position-absolute top-0 end-0 mt-3 me-3" variant="primary" >
                                        <i className='bx bxs-plus-circle'></i>
                                        Add Homework
                                    </Button>
                                    <h5 className="card-header">Homeworks</h5>
                                    <div >
                                        <div className='col-8'>
                                        </div>
                                        <div className='col-4'>
                                        </div>
                                        <div className="card-body ">
                                            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">

                                                {data.map(Homework => (
                                                    <div className="col">
                                                        <div className="card h-100">
                                                            <div className="card-body">
                                                                <h5 className="card-title">{Homework.title}</h5>
                                                                <p className="card-text">
                                                                    {Homework.description}
                                                                </p>
                                                            </div>

                                                            <div className="dropdown">
                                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                    <i className="bx bx-dots-vertical-rounded" />
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <a className="dropdown-item" href="javascript:void(0);" ><i className="bx bx-edit-alt me-1" /> Edit</a>
                                                                    <a className="dropdown-item text-decoration-none pointer"    ><i className="bx bx-trash me-1" /> Delete</a>
                                                                </div>
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
            <ModalHomework show={show} handleClose={handleClose}></ModalHomework>

        </div>
    )
}

export default Homework


